/*
 * 판매자가 선택한 시간 중
 * 구매자가 선택하는 달력
 *
 */
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./SimpleCalendarDesign.css";
import SelectedTime from "./SelectedTime";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../utils/api";
import { response } from "express";
import styled from "styled-components";

export default function SimpleCalendar({
  itemNo,
  mark,
  myNickname,
  sellerNickname,
}: any) {
  // 마우스로 선택한 날짜 받는 state(tmp data)
  const [clickedDate, setClickedDate] = useState(new Date());

  // Times component 조건부 랜더링에 필요한 boolean값
  const [showTime, setShowTime] = useState(false);

  // 선택 불가능 dates (이미 예약됨)
  const [impossibleDates, setImpossibleDates] = useState<string[]>([]);

  // 해당 아이템에 대한 판매자가 등록한 날짜 모두 불러오기는 부모 프롭스에서 완료

  // 선택한 날짜로 date 바꿔주고
  const onChange = (event: any) => {
    if (!localStorage.getItem("USER")) {
      alert("로그인 후 조회 가능합니다.");
      return;
    }

    setClickedDate(new Date(event));
  };

  // 클릭하면 해당 날짜의 타임리스트 보여주거나 다시 돌아가거나
  useEffect(() => {
    const markedDate = mark.map((m: any) => dayjs(m.date).format("YYYY-MM-DD"));
    if (markedDate.includes(dayjs(clickedDate).format("YYYY-MM-DD"))) {
      setShowTime(true);
    } else {
      setShowTime(false);
    }
  }, [clickedDate, mark]);

  return (
    <ScheduleDiv>
      <Calendar
        // onchange로 date를 추출해내고
        onChange={onChange}
        value={clickedDate}
        // "일" 빼는 속성
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        tileClassName={({ date }: any) => {
          if (
            mark.find(
              (x: any) =>
                dayjs(x.date).format("YYYY-MM-DD") ===
                dayjs(date).format("YYYY-MM-DD")
            )
          ) {
            return "possible";
          }
        }}
        tileDisabled={({ date }: any) =>
          new Date(dayjs(Date.now()).format("YYYY-MM-DD")) >
          new Date(dayjs(date).format("YYYY-MM-DD"))
        }
        onClickDay={(date: any) => {
          onChange(date);
        }}
      />
      {/* else if로 원래 안 되는 날짜()
          오늘 전 날짜(원래 안 되는 날짜2)
          되는 날이었는데 이미 occupied인 날짜
          ~className따로 주기 */}

      <SelectedTime
        itemNo={itemNo}
        showTime={showTime}
        clickedDate={clickedDate}
        mark={mark}
        myNickname={myNickname}
        sellerNickname={sellerNickname}
      />
    </ScheduleDiv>
  );
}

const ScheduleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;
