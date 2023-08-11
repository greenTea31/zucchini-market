import styled from "styled-components";
import { ReactNode } from "react";

type ChatProps = {
  children?: ReactNode;
};

export default function LeftChat({ children }: ChatProps) {
  return (
    <LeftBubble>
      <span>{children}</span>
    </LeftBubble>
  );
}

const LeftBubble = styled.div`
  padding: 1rem 1.5rem;
  width: fit-content;
  max-width: 13rem;
  border-radius: 0 2rem 2rem 2rem;
  background-color: white;
`;
