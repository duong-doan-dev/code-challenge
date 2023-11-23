import { memo } from "react";
import { Input } from "@/components/common/Input";
import {
  StyledInputGroup,
  StyledLabel,
  StyledInputIcon,
  StyledSubLabel,
  StyledInputInnerWrap,
} from "@/components/InputGroup/styled";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface InputGroupProps {
  value: string;
  name: string;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  subLabel?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputGroup = memo(
  ({
    value,
    name,
    label,
    subLabel,
    startIcon,
    icon,
    placeholder,
    onChange,
    loading = false,
    disabled = false,
  }: InputGroupProps) => {
    return (
      <StyledInputGroup>
        <StyledInputInnerWrap>
          <StyledLabel>{label}</StyledLabel>

          <StyledInputIcon>
            {startIcon}

            <Input
              name={name}
              value={value}
              disabled={disabled}
              onChange={onChange}
              placeholder={placeholder}
              size="lg"
            />

            {icon}
          </StyledInputIcon>
        </StyledInputInnerWrap>

        <StyledSubLabel>
          {loading ? <LoadingSpinner /> : subLabel}
        </StyledSubLabel>
      </StyledInputGroup>
    );
  }
);
