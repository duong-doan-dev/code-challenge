import { memo } from "react";
import { InputSize, StyledInput } from "@/components/common/Input/styled";

interface InputProps {
  value: string;
  name: string;
  disabled?: boolean;
  size?: InputSize;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = memo(
  ({
    value,
    name,
    placeholder,
    onChange,
    disabled = false,
    size = "md",
  }: InputProps) => {
    return (
      <StyledInput
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        $size={size}
      />
    );
  }
);
