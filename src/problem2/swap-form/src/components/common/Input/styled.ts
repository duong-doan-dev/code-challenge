import styled from "styled-components";

export type InputSize = "sm" | "md" | "lg";

const sizeVariants: Record<InputSize, number> = {
  sm: 15,
  md: 20,
  lg: 25,
};

export const StyledInput = styled.input<{ $size: InputSize }>`
  width: 100%;
  background-color: transparent;
  font-size: ${({ $size }) => `${sizeVariants[$size]}px`};
  color: #1f2937;
  border: none;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;
