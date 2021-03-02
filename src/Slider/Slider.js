import * as React from "react";
import axios from "axios";
import { gsap, Draggable, TweenMax, Power1 } from 'gsap/all'

import  Arrow from "./Arrow";
import {
  SliderContainer,
  SlidesContainer,
  Slide,
  DotsContainer,
  Dot,
  ArrowsContainer,
  PrevButton,
  NextButton,
} from "./StyledComponents";

import { api } from "./constants";

gsap.registerPlugin(Draggable);

const Slider = () => {
  const [slides, setSlides] = React.useState([]);
  const [current, setCurrent] = React.useState(0);
  const [dragOffsetStart, setDragOffsetStart] = React.useState(0);
  const [dragOffsetEnd, setDragOffsetEnd] = React.useState(0);
  const [draggable, setDraggable] = React.useState(null);
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const sliderRef = React.useRef(null);

  const handleResize = () => setSliderWidth(sliderRef.current.clientWidth);

  const fetchSlides = async () => {
    try {
      const response = await axios.get(api);
      setSlides(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  const handlePrev = () => {
    if (current === 0) return;
    setCurrent(current - 1);
  }

  const handleNext = () => {
    if (current  === slides.length - 1) return;
    setCurrent(current + 1);
  }

  React.useEffect(() => {
    fetchSlides();
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [draggable])

  React.useEffect(() => {
    const slidesEl = sliderRef.current;
    if (!slidesEl) return;
    setSliderWidth(slidesEl.clientWidth);
  }, [slides])

  React.useEffect(() => {
    if (!sliderWidth) return;
    setDraggable(Draggable.create(sliderRef.current, {
      type: "x",
      bounds: {
        minX: - (slides.length - 1) * sliderWidth,
        maxX: 0,
      },
      onDragStart: e => setDragOffsetStart(e.clientX),
      onDragEnd: e => setDragOffsetEnd(e.clientX),
    }));

    return () => setDraggable(null);
  }, [slides.length, sliderWidth])

  React.useEffect(() => {
    const slidesEl = sliderRef.current
    if (!slides.length) return;
    let dragged = dragOffsetEnd - dragOffsetStart;
    if (Math.abs(dragged) < sliderWidth)
      dragged = dragged < 0 ? -sliderWidth : sliderWidth;
    const newIndex = current - Math.round(dragged / sliderWidth);
    switch (true) {
      case newIndex < 0:
        setCurrent(0);
        break;
      case newIndex > slides.length - 1:
        setCurrent(slides.length - 1);
        break;
      default:
        setCurrent(newIndex);
        TweenMax.to(slidesEl, 0.25, {
          x: - current * sliderWidth,
          ease: Power1.easeInOut,
        })
        break;
    }
  }, [dragOffsetEnd])

  React.useEffect(() => {
    const slidesEl = sliderRef.current
    if (!slidesEl) return;
    TweenMax.to(slidesEl, 0.25, {
      x: - current * sliderWidth,
      ease: Power1.easeInOut,
    })
  }, [current, sliderWidth])

  return (
    <SliderContainer>
      <SlidesContainer ref={sliderRef}>
        {
          slides.map((slide, index) => (
            <Slide key={index} index={index} url={slide.url} />
          ))
        }
      </SlidesContainer>
      <DotsContainer>
        {
          slides.map((_, index) => (
            <Dot
              key={index}
              active={index <= current}
              onClick={() => setCurrent(index)}
            />
          ))
        }
      </DotsContainer>
      <ArrowsContainer>
        <PrevButton onClick={handlePrev}>
          <Arrow disabled={current === 0} />
        </PrevButton>
        <NextButton onClick={handleNext}>
          <Arrow disabled={current === slides.length - 1} />
        </NextButton>
      </ArrowsContainer>
    </SliderContainer>
  )
}

export default Slider;
