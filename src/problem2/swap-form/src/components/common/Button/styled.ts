import styled from "styled-components";

export type StyleVariant = "primary" | "secondary" | "default";

export type SizeVariant = "sm" | "md" | "lg";

const colorVariant: Record<StyleVariant, string> = {
  primary: "#3b82f6",
  secondary: "#a8a29e",
  default: "#ec4899",
};

const heightVariants: Record<SizeVariant, number> = {
  sm: 20,
  md: 35,
  lg: 45,
};

export const StyledButton = styled.button<{
  $fullWidth?: boolean;
  $variant: StyleVariant;
  $size: SizeVariant;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background-color: ${(props) => colorVariant[props.$variant]};
  border-radius: 50px;
  white-space: nowrap;
  cursor: pointer;
  width: ${(props) => (props.$fullWidth ? "100%" : "fit-content")};
  height: ${(props) => `${heightVariants[props.$size]}px`};

  &:focus {
    outline: none;
  }
`;
