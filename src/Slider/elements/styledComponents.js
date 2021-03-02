import styled from "styled-components";

import { sliderMaxWidth, sliderMaxHeight } from "../constants";

export const SliderContainer = styled.div`
  position: relative;
  margin: auto;
  max-width: ${sliderMaxWidth}px;
  max-height: ${sliderMaxHeight}px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const SlidesContainer = styled.ul`
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
  z-index: 1 !important;
`;

export const Slide = styled.li`
  position: absolute;
  left: ${p => 100 * p.index}%;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-image: url('${p => p.url}');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const CustomButton = styled.button`
  display: block;
  outline: none;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  background-color: #fff;
`;

const ArrowButton = styled(CustomButton)`
  width: 70px;
  height: 70px;

  svg {
    width: 16px;
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 28px 46px;
  z-index: 2;
`;

export const Dot = styled(CustomButton)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 4px;
  padding: 0;
  opacity: ${p => p.active ? 1 : 0.5};
  transform: translateX(${p => p.active ? '-340%' : '0%'}) scale(${p => p.active ? 1 : 0.9});
  transition: transform 0.2s ease-in-out;
`;

export const ArrowsContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 2;
`;

export const PrevButton = styled(ArrowButton)`
  transform: scaleX(-1);
`;

export const NextButton = styled(ArrowButton)`
  border-left: 1px solid #f3f3f3;
`;
