import { FaMagnifyingGlass } from "react-icons/fa6";
import styled from "styled-components";

export const StyledSearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f8fafc;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px;
  margin-inline: 10px;

  &::placeholder {
    color: #6b7280;
  }
`;

export const StyledSearchIcon = styled(FaMagnifyingGlass)`
  color: #6b7280;
`;
