import RightChat from "../Chat/RightChat";
import LeftChat from "../Chat/LeftChat";

export default function MesssageEach({ send }: any) {
  return (
    <div>
      {/* 조건부에 본인인지 상대방인지 알아보는 로직 */}
      {send % 2 === 0 ? (
        <RightChat>되나........된다!</RightChat>
      ) : (
        <LeftChat>어쩌고 저쩌꼬</LeftChat>
      )}
    </div>
  );
}
