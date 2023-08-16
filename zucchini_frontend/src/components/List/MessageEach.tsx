import RightChat from "../Chat/RightChat";
import LeftChat from "../Chat/LeftChat";
import Imessage from "../../types/Imessage";
import styled from "styled-components";
import dayjs from "dayjs";
interface Iprops {
  message: Imessage;
  isUser: boolean;
}

export default function MesssageEach(props: Iprops) {
  return (
    <div>
      {/* 조건부에 본인인지 상대방인지 알아보는 로직 */}
      {props.isUser ? (
        <RightChatDiv>
          <BubbleDiv>
            <SubDiv>
              {props.message.read ? <ReadP>읽음</ReadP> : <ReadP>안읽음</ReadP>}
              <p>{props.message.read}</p>
            </SubDiv>
            <RightChat>{props.message.content}</RightChat>
          </BubbleDiv>
          <TimeDiv>{dayjs(props.message.createdAt).format("HH:mm")}</TimeDiv>
        </RightChatDiv>
      ) : (
        <div>
          <p>{props.message.sender}</p>
          <LeftChat>{props.message.content}</LeftChat>
          <TimeLeftDiv>
            {dayjs(props.message.createdAt).format("HH:mm")}
          </TimeLeftDiv>
        </div>
      )}
    </div>
  );
}

const RightChatDiv = styled.div`
  float: right;
  display: flex;
  flex-direction: column;
`;

const BubbleDiv = styled.div`
  display: flex;
`;

const SubDiv = styled.div``;

const ReadP = styled.p`
  font-size: 0.8rem;
  color: gray;
`;

const TimeDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: #4b4b4b;
`;

const TimeLeftDiv = styled.div`
  font-size: 0.8rem;
  color: #4b4b4b;
`;
