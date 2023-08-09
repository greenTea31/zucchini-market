import RightChat from "../Chat/RightChat";
import LeftChat from "../Chat/LeftChat";
import Imessage from "../../types/Imessage";

interface Iprops {
  message: Imessage;
  isUser: boolean;
}

export default function MesssageEach(props: Iprops) {
  return (
    <div>
      {/* 조건부에 본인인지 상대방인지 알아보는 로직 */}
      {props.isUser ? (
        <RightChat>
          보낸 사람 : {props.message.sender}
          <br />
          내용: {props.message.content}
          <br />
          읽음 여부: {props.message.read ? "잘읽음" : "안읽음"}
          {props.message.read}
          <br />
          보낸 날짜:{props.message.createdAt}
        </RightChat>
      ) : (
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
      )}
    </div>
  );
}
