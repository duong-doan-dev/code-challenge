import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateBack = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

export const StyledLoadingSpinner = styled.span`
  width: 25px;
  height: 25px;
  border: 2px dotted #fff;
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${rotate} 2s linear infinite;

  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px dotted #ff3d00;
    border-style: solid solid dotted;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: ${rotateBack} 1s linear infinite;
    transform-origin: center center;
  }
`;
