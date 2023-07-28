import styled from "styled-components";
import RightChat from "./Chat/RightChat";
import LeftChat from "./Chat/LeftChat";

export default function Chatting() {
  return (
    <ChatBubble>
      <RightChat>되나........된다!</RightChat>
      <LeftChat>어쩌고 저쩌꼬</LeftChat>
      <LeftChat>
        어쩌고 저쩌꼬dd오오애ㅓ아너ㅣ란멍라 ㅓ내일 발표ㅔㄴ에에ㅔ에
      </LeftChat>
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
