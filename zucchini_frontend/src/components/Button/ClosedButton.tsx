import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ClosedButton({ ...props }: IProps) {
  return (
    <Container {...props}>
      <ClosedSvg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </ClosedSvg>
    </Container>
  );
}

const Container = styled.button`
  background-color: transparent;
  border-color: transparent;
`;

const ClosedSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: #849c80;
`;
