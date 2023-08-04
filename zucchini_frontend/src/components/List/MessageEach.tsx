import RightChat from "../Chat/RightChat";
import LeftChat from "../Chat/LeftChat";
import Imessage from "../../types/Imessage";

interface Iprops {
  message: Imessage;
}

export default function MesssageEach(props: Iprops) {
  return (
    <div>
      {/* 조건부에 본인인지 상대방인지 알아보는 로직 */}
      {props.message.sender === "SSAFY" ? (
        <RightChat>{props.message.content}</RightChat>
      ) : (
        <LeftChat>{props.message.content}</LeftChat>
      )}
    </div>
  );
}
