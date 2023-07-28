import styled from "styled-components";
import MesssageEach from "./List/MessageEach";

export default function Chatting() {
  return (
    <ChatBubble>
      {[1, 2, 3, 4, 5].map((e, i) => (
        // props로 작성자 정보 보내주기
        <MesssageEach send={e} />
      ))}
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
