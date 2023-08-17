import { useEffect, useState } from "react";
import { Button } from "../Common/Button";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/url";
import api from "../../utils/api";
import dayjs from "dayjs";

// 우선 갖다놓는 날짜(임시, 테스트용.)
// DB에서 해당 아이템,  해당 날짜에 해당하는 시간을 불러오는 로직 구현하기.
// 아래 functions 안에서!
export default function Times({
  itemNo,
  clickedDate,
  mark,
  setFixedSchedule,
}: any) {
  // clickedDate에 해당하는 시간들 담을 배열
  // const [times, setTimes] = useState([]);

  //시간 버튼 생성하자
  //우선 날짜 맞는 거 찾는 로직
  const hasSameDate = (date1: Date, date2: Date) =>
    dayjs(date1).isSame(date2, "year") &&
    dayjs(date1).isSame(date2, "month") &&
    dayjs(date1).isSame(date2, "day");

  const times = mark.filter((m: any) => hasSameDate(clickedDate, m.date));

  // 시간 버튼 클릭 시
  const navigate = useNavigate();
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      // 버튼 안의 시간입니다. 아래.
      await api({
        method: "post",
        url: "reservation/check",
        data: {
          itemNo: itemNo,
          selectDate: new Date(
            `${dayjs(clickedDate).format("YYYY-MM-DD")}T${
              event.currentTarget.textContent
            }:00`
          ),
        },
      }).then((response) => {
        if (response.data.status === 0) {
          alert("이미 예약됨");
          console.log(response.data.status);
        } else if (response.data.status === 1) {
          // 예약 가능하지만 구매자가 등록한 판매 상품의 날짜 목록이랑 겹침
          console.log(response.data.status);
          alert(
            "내가 판매 중인  등록된 일정과 겹칩니다. 이전에 등록한 일정을 지우고 이 예약을 확정하시겠습니까?"
          );
        } else if (response.data.status === 2) {
          console.log(response.data.status);
          // 바로 예약
          alert("예약이 확정되었습니다.");
          window.location.reload();
        }
      });

      // 그리고 확정 됐으니 확정된 건 보여주고 나머지 비활.
      // fixed schedule을 써야할까?
      // 더 쉽게 하려면 끄기. 비활은 필요...
    } catch (error) {
      alert("이미 이 상품에 대해 예약된 화상통화 일정이 존재합니다.");
    }
  };
  //
  const onConfirm = async () => {
    try {
      await axios.post(BASE_URL + "reservation/confirm");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ButtonDiv>
      {times.map((time: any) => {
        const disable = () => {
          return time.status === 1;
        };
        const ButtonComponent = disable() ? SpecialTimeButton : TimeButton;
        return (
          <ButtonComponent
            disabled={disable()}
            onClick={disable() ? undefined : onClick}
          >
            {dayjs(time.date).format("HH:mm")}
          </ButtonComponent>
        );
      })}
    </ButtonDiv>
  );
}

const ButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  margin: 0.5rem;
`;

const TimeButton = styled.button`
  font-size: 1.2rem;
  font-weight: 450;
  width: 6rem;
  height: 3rem;
  background-color: #99de77;
  border: none;
  border-radius: 0.3rem;
  color: #38461f;
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    border: solid 2px darkolivegreen;
    border-radius: 0.3rem;
    background-color: #e7f0e0;
    color: #38461f;
  }
`;

const SpecialTimeButton = styled(TimeButton)`
  background-color: #c5c8b9;
  color: #54633a;

  cursor: default;

  &:hover {
    border: none;
    background-color: #b8b9b2;
    color: #ced8be;
  }
`;
