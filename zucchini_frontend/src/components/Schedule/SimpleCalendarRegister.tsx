/*
 * 판매자 등록용 달력
 */
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./SimpleCalendarDesign.css";
import TimeSchedule from "./TimeSchedule";

export default function SimpleCalendar({
  selectedTimes,
  setSelectedTimes,
}: any) {
  // 마우스로 선택한 날짜 받는 state
  const [clickedDate, setClickedDate] = useState(new Date());

  // 선택한 날짜로 date 바꿔주고
  const onChange = (event: any) => {
    setClickedDate(event);
  };

  const [isTimeScheduleOpen, setTimeScheduleOpen] = useState(false);

  const toggleTimeScheduleModal = () => {
    setTimeScheduleOpen((prevIsOpen) => !prevIsOpen);
  };
  /*
   * 통신을 통해 서버에서 해당 아이템에 대한
   * 판매자의 선택날짜 mark배열에 담을
   * 메서드 구현하기
   */

  return (
    <div>
      <Calendar
        // onchange로 date를 추출해내고
        onChange={onChange}
        value={clickedDate}
        // "일" 빼기
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        onClickDay={(date) => {
          onChange(date);
          toggleTimeScheduleModal();
        }}
      />

      <TimeSchedule
        isOpen={isTimeScheduleOpen}
        toggle={toggleTimeScheduleModal}
        date={moment(clickedDate).format("YYYY-MM-DD")}
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
      />
    </div>
  );
}
