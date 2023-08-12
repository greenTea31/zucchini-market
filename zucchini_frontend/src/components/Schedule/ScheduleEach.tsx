import styled from "styled-components";
import { Button } from "../Common/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";

export interface IItem {
  title: string;
  confirmedDate: string;
  conferenceNo: number;
}

interface IProps {
  item: IItem;
}

export default function ScheduleEach(props: IProps) {
  const date1 = dayjs(props?.item?.confirmedDate);
  const now = dayjs();

  return (
    <VideoDiv>
      <TimeP>
        {moment(props?.item?.confirmedDate).format("YYYY년 MM월 DD일")}
        <br />
        {moment(props?.item?.confirmedDate).format("hh시 mm분")}
      </TimeP>
      <TitleP>{props?.item?.title}</TitleP>
      {date1.diff(now, "minute") <= 10 ? (
        <Link
          to={`/conference/${props?.item?.conferenceNo}`}
          state={{ title: `${props?.item?.title}` }}
        >
          <Button kind={"small"} Variant={"pinkTonal"}>
            참여
          </Button>
        </Link>
      ) : (
        <NoneButton>없음</NoneButton>
      )}
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

const NoneButton = styled.button`
  font-size: 15px;
  padding: 11px 16px;
  border: transparent;
  color: transparent;
  background-color: transparent;
`;
