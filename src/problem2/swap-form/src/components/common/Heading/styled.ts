import styled from "styled-components";

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const sizeVariant: Record<HeadingVariant, number> = {
  h1: 30,
  h2: 28,
  h3: 25,
  h4: 20,
  h5: 18,
  h6: 10,
};

export const StyledHeading = styled.h1<{ $as: HeadingVariant }>`
  font-size: ${(props) => `${sizeVariant[props.$as]}px`};
  font-weight: 700;
  color: #1f2937;
  margin-block-end: 20px;
`;
