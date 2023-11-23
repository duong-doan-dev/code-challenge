import { memo } from "react";
import {
  SizeVariant,
  StyledButton,
  StyleVariant,
} from "@/components/common/Button/styled";

interface ButtonProps {
  label?: string;
  variant?: StyleVariant;
  size?: SizeVariant;
  icon?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = memo(
  ({
    onClick,
    icon,
    startIcon,
    endIcon,
    label,
    variant = "primary",
    size = "md",
  }: ButtonProps) => {
    return (
      <StyledButton onClick={onClick} $variant={variant} $size={size}>
        {startIcon}
        {label}
        {icon}
        {endIcon}
      </StyledButton>
    );
  }
);
