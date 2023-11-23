import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import styled from "styled-components";

export const StyledModal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  max-height: 600px;
  overflow-y: scroll;
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  padding-block: 10px;
`;

export const StyledBackDrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCloseIcon = styled(FaXmark)`
  align-self: flex-end;
  padding-right: 10px;
  color: #1f2937;

  cursor: pointer;
`;

export const StyledModalTitle = styled.h5`
  font-size: 25px;
  font-weight: 700;
  color: #1f2937;
  text-align: left;
  margin-bottom: 20px;
  margin-inline: 10px;
`;
