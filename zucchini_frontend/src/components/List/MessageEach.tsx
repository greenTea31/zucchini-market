import RightChat from "../Chat/RightChat";
import LeftChat from "../Chat/LeftChat";
import Imessage from "../../types/Imessage";
import styled from "styled-components";
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
          <SubDiv>
            {/* <p> */}
            {props.message.read ? <ReadP>읽음</ReadP> : <ReadP>안읽음</ReadP>}
            {/* </p> */}
            <p>{props.message.read}</p>
          </SubDiv>
          <RightChat>
            내용: {props.message.content}
            <br />
            읽음 여부: {props.message.read ? "잘읽음" : "안읽음"}
            {props.message.read}
            <br />
            보낸 날짜:{props.message.createdAt}
          </RightChat>
        </RightChatDiv>
      ) : (
        <div>
          <p>{props.message.sender}</p>
          <LeftChat>
            보낸 사람 : {props.message.sender}
            <br />
            내용: {props.message.content}
            <br />
            읽음 여부: {props.message.read ? "잘읽음" : "안읽음"} :
            {props.message.read}
            <br />
            보낸 날짜:{props.message.createdAt}
          </LeftChat>
        </div>
      )}
    </div>
  );
}

const RightChatDiv = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
`;

const SubDiv = styled.div``;

const ReadP = styled.p`
  font-size: 0.8rem;
  color: gray;
`;
