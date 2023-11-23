import styled from "styled-components";

export const StyledListItem = styled.li<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.$selected ? 0.5 : 1)};
  ${(props) => props.$disabled && { pointerEvents: "none" }}

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const StyledListItemLabel = styled.span`
  color: blue;
`;
