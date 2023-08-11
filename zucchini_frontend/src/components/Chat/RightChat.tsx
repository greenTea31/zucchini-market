import styled from "styled-components";
import { ReactNode } from "react";

type ChatProps = {
  children?: ReactNode;
};

export default function RightChat({ children }: ChatProps) {
  return (
    <div>
      <RightBubble>
        <span>{children}</span>
      </RightBubble>
    </div>
  );
}

const RightBubble = styled.div`
  padding: 1rem 1.5rem;
  width: fit-content;
  max-width: 13rem;
  border-radius: 2rem 2rem 0 2rem;
  background-color: #a32fff;
  color: white;
  float: right;
`;
