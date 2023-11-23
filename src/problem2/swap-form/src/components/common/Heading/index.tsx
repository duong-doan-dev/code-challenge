import { PropsWithChildren, memo } from "react";
import { HeadingVariant, StyledHeading } from "./styled";

interface HeadingProps {
  as?: HeadingVariant;
}
export const Heading = memo(
  ({ children, as = "h1" }: PropsWithChildren<HeadingProps>) => {
    return <StyledHeading $as={as}>{children}</StyledHeading>;
  }
);
