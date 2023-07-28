import styled from "styled-components";
import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
};

export default function FullWidthButton({ onClick, children }: ButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  height: 3rem;
  border: 2px solid #cde990;
  border-radius: 0.4rem;
  background-color: white;
  margin: 0.3rem;
  font-size: 1rem;

  &:hover {
    background-color: #cde990;
    cursor: pointer;
  }
`;
