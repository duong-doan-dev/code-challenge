import { memo } from "react";
import { StyledListItem, StyledListItemLabel } from "./styled";

interface ListItemProps {
  value: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export const ListItem = memo(
  ({ label, icon, value, selected, disabled, onClick }: ListItemProps) => {
    return (
      <StyledListItem
        onClick={onClick}
        $selected={selected}
        $disabled={disabled}
        value={value}
      >
        {icon}

        <StyledListItemLabel>{label}</StyledListItemLabel>
      </StyledListItem>
    );
  }
);
