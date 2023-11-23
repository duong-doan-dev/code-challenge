import styled from "styled-components";

export const StyledInputGroup = styled.div`
  background-color: #f8fafc;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
  padding-top: 10px;
  overflow: hidden;
  width: 100%;
`;

export const StyledLabel = styled.p`
  color: #1f2937;
  font-weight: 500;
  text-align: start;
  margin-block: 5px;
`;

export const StyledInputIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const StyledSubLabel = styled(StyledLabel)`
  background-color: #86efac;
  margin-block: 0;
  padding: 10px;
  margin-top: 10px;
`;

export const StyledInputInnerWrap = styled.div`
  padding-inline: 10px;
`;
