import styled from "styled-components";
import cycle from "../assets/images/cycle.png";

export default function ChatList() {
  return (
    <ContainerDiv>
      {/* <TitleSpan>나의 채팅 목록</TitleSpan> */}
      <ChatListDiv>
        <TitleDiv>
          <TitleSpan>채팅 목록</TitleSpan>
        </TitleDiv>
        <ChatDiv>
          <ChatImg src={cycle}></ChatImg>
          <ChatInfoDiv>
            <InfoTitleSpan>픽시 자전거 팝니다. 연락주세요 :)</InfoTitleSpan>
            <MessageSpan>판매되었나요?</MessageSpan>
          </ChatInfoDiv>
          <ChatTimeDiv>
            <MessageSpan>15:30</MessageSpan>
            <ColorDiv>2</ColorDiv>
          </ChatTimeDiv>
        </ChatDiv>
        <hr />
        <ChatDiv>
          <ChatImg src={cycle}></ChatImg>
          <ChatInfoDiv>
            <InfoTitleSpan>픽시 자전거 팝니다. 연락주세요 :)</InfoTitleSpan>
            <MessageSpan>판매되었나요?</MessageSpan>
          </ChatInfoDiv>
          <ChatTimeDiv>
            <MessageSpan>15:30</MessageSpan>
            <ColorDiv>2</ColorDiv>
          </ChatTimeDiv>
        </ChatDiv>
        <hr />
        <ChatDiv>
          <ChatImg src={cycle}></ChatImg>
          <ChatInfoDiv>
            <InfoTitleSpan>픽시 자전거 팝니다. 연락주세요 :)</InfoTitleSpan>
            <MessageSpan>판매되었나요?</MessageSpan>
          </ChatInfoDiv>
          <ChatTimeDiv>
            <MessageSpan>15:30</MessageSpan>
            <ColorDiv>2</ColorDiv>
          </ChatTimeDiv>
        </ChatDiv>
        <hr />
        <ChatDiv>
          <ChatImg src={cycle}></ChatImg>
          <ChatInfoDiv>
            <InfoTitleSpan>픽시 자전거 팝니다. 연락주세요 :)</InfoTitleSpan>
            <MessageSpan>판매되었나요?</MessageSpan>
          </ChatInfoDiv>
          <ChatTimeDiv>
            <MessageSpan>15:30</MessageSpan>
            <ColorDiv>2</ColorDiv>
          </ChatTimeDiv>
        </ChatDiv>
        <hr />
      </ChatListDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const TitleSpan = styled.span`
  font-size: 1.4rem;
`;

const ChatListDiv = styled.div`
  height: 40rem;
  width: 37rem;
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

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

const TitleDiv = styled.div`
  padding: 1rem 0;
`;
