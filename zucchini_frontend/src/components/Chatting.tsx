import styled from "styled-components";

export default function Chatting() {
  return (
    <ChatBubble>
      <div>
        <RightBubble>
          <RightSpan>어쩌고저쩌고어쩌고저쩌고고고고고고</RightSpan>
        </RightBubble>
      </div>
      <LeftBubble>
        <LeftSpan>어쩌고저쩌고</LeftSpan>
      </LeftBubble>
      <LeftBubble>
        <LeftSpan>어쩌고저쩌고쩌고쩌고</LeftSpan>
      </LeftBubble>
    </ChatBubble>
  );
}

const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 30rem;
  line-height: 1.4rem;
`;

const RightBubble = styled.div`
  padding: 1rem 1.5rem;
  width: fit-content;
  margin-bottom: 0.7rem;
  max-width: 13rem;
  border-radius: 2rem 2rem 0 2rem;
  background-color: #a32fff;
  color: white;
  float: right;
`;

const LeftBubble = styled.div`
  padding: 1rem 1.5rem;
  width: fit-content;
  margin-bottom: 0.7rem;
  max-width: 13rem;
  border-radius: 0 2rem 2rem 2rem;
  background-color: white;
`;

const RightSpan = styled.span``;
const LeftSpan = styled.span``;
