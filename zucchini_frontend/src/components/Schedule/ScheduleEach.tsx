import styled from "styled-components";
import { Button } from "../Common/Button";

export default function ScheduleEach() {
  return (
    <VideoDiv>
      <p>10:30 - 11:00</p>
      <TitleP>삼성 갤럭시북 PRO 2 팔아요</TitleP>
      <Button Size={"small"} Variant={"pinkTonal"}>
        참여
      </Button>
    </VideoDiv>
  );
}

const VideoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: solid 1px #254021;
  align-items: center;
`;

const TitleP = styled.p`
  font-weight: 500;
`;
