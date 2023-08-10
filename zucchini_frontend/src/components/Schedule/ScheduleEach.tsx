import styled from "styled-components";
import { Button } from "../Common/Button";
import { Link } from "react-router-dom";
import moment from "moment";

export interface IItem {
  title: string;
  confirmedDate: string;
  conferenceNo: number;
}

interface IProps {
  item: IItem;
}

export default function ScheduleEach(props: IProps) {
  return (
    <VideoDiv>
      <TimeP>
        {moment(props?.item?.confirmedDate).format("YYYY년 MM월 DD일")}
        <br />
        {moment(props?.item?.confirmedDate).format("hh시 mm분")}
      </TimeP>
      <TitleP>{props?.item?.title}</TitleP>
      <Link to={`/conference/${props?.item?.conferenceNo}`}>
        <Button kind={"small"} Variant={"pinkTonal"}>
          참여
        </Button>
      </Link>
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

const TimeP = styled.p`
  line-height: 1.5rem;
  text-align: center;
`;
