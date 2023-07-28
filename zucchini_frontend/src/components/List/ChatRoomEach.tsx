import styled from "styled-components";
//임시쏘오쓰
import cycle from "../../assets/images/cycle.png";

export default function ChatRoomEach(props: any) {
  return (
    <div>
      <ChatDiv>
        <ChatImg src={cycle}></ChatImg>
        <ChatInfoDiv>
          <InfoTitleSpan>{props.chat.sender}</InfoTitleSpan>
          <MessageSpan>{props.chat.msg}</MessageSpan>
        </ChatInfoDiv>
        <ChatTimeDiv>
          <MessageSpan>15:30</MessageSpan>
          <ColorDiv>2</ColorDiv>
        </ChatTimeDiv>
      </ChatDiv>
      <hr />
    </div>
  );
}

const ChatDiv = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChatImg = styled.img`
  height: 4rem;
  width: 4rem;
  border: solid 1px gray;
  border-radius: 0.4rem;
`;

const ChatInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 68%;
`;

const ChatTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const InfoTitleSpan = styled.span`
  margin-bottom: 0.6rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const MessageSpan = styled.span`
  color: gray;
`;

const ColorDiv = styled.div`
  background-color: #a32fff;
  height: 2rem;
  width: 2rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
