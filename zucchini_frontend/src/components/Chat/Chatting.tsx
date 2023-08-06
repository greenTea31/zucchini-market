import styled from "styled-components";
import MesssageEach from "../List/MessageEach";
import Imessage from "../../types/Imessage";

interface Iprops {
  message: Imessage;
}

export default function Chatting(props: Iprops) {
  return (
    <ChatBubble>
      <MesssageEach message={props.message} />
      {/* {[1, 2, 3, 4, 5].map((e, i) => (
        // props로 작성자 정보 보내주기
        <MesssageEach send={e} />
      ))} */}

      {/* {messages.map((message, index) => (
        <MesssageEach key={index} message={message} />
      ))} */}
    </ChatBubble>
  );
}

const ChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 1rem; */
  /* padding-left: 1rem; */
  line-height: 1.4rem;
`;
