import { PropsWithChildren, memo } from "react";
import { AnimatePresence } from "framer-motion";

import {
  StyledBackDrop,
  StyledCloseIcon,
  StyledModal,
  StyledModalTitle,
} from "@/components/common/Modal/styled";
import { overlayVariants } from "@/components/common/Modal/constants";

interface ModalProps {
  isOpen: boolean;
  title: string;
  closeModal?: () => void;
}

export const Modal = memo(
  ({ children, closeModal, title, isOpen }: PropsWithChildren<ModalProps>) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <StyledBackDrop
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
          >
            <StyledModal
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StyledCloseIcon onClick={closeModal} />
              <StyledModalTitle>{title}</StyledModalTitle>

              {children}
            </StyledModal>
          </StyledBackDrop>
        )}
      </AnimatePresence>
    );
  }
);
