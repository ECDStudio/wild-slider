import * as React from "react";

const Arrow = ({disabled}) => {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 15.8 6.8" fill={ disabled ? "#d0d0d0" : "#0a0a0a" }>
      <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 "/>
    </svg>
  )
};

export default Arrow;
