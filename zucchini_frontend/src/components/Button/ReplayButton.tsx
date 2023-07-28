import styled from "styled-components";
import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
};

export default function ReplayButton({ children }: ButtonProps) {
  return <ReplayBtn>{children}</ReplayBtn>;
}

const ReplayBtn = styled.button`
  position: absolute;
  right: 1.6rem;
  bottom: 9.6rem;
  width: 5.5rem;
  height: 2.5rem;
  color: white;
  background-color: red;
  border: transparent;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  letter-spacing: 0.08rem;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: solid 2px red;
    color: red;
  }
`;
