import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
  gap: 10px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  border-radius: 10px;
  transition: all 1s ease;
  width: 90%;

  @media (min-width: 768px) {
    min-width: 600px;
  }
`;

export const StyledListWrap = styled.ul`
  max-height: 400px;

  overflow-y: scroll;
`;
