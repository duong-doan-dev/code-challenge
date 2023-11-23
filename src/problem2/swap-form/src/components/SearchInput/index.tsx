import { memo } from "react";
import { Input } from "@/components/common/Input";
import {
  StyledSearchInput,
  StyledSearchIcon,
} from "@/components/SearchInput/styled";

interface SearchInputProps {
  value: string;
  name: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = memo(
  ({ name, value, onChange, placeholder }: SearchInputProps) => {
    return (
      <StyledSearchInput>
        <StyledSearchIcon />

        <Input
          name={name}
          value={value}
          size="sm"
          onChange={onChange}
          placeholder={placeholder}
        />
      </StyledSearchInput>
    );
  }
);
