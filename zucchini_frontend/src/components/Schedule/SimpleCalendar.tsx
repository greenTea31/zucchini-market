import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./SimpleCalendarDesign.css";
import SelectedTime from "./SelectedTime";
import TimeSchedule from "./TimeSchedule";

export default function SimpleCalendar() {
  // 마우스로 선택한 날짜 받는 state
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Times component 조건부 랜더링에 필요한 boolean값
  const [showTime, setShowTime] = useState(false);

  // 판매자가 등록시 선택한 시간 통신으로 서버에서 받아올 배열 만들기
  // 초기값은 임시. 원래 []
  const [mark, setMark] = useState(["2023-07-20", "2023-07-22", "2023-07-24"]);

  // 달력에서 선택(클릭)한 날짜 콘솔로그(테스트용)
  // useEffect(() => {
  //   console.log(selectedDate);
  // }, [selectedDate]);

  // 선택한 날짜로 date 바꿔주고
  const onChange = (event: any) => {
    setSelectedDate(event);
  };

  // 클릭하면 해당 날짜의 타임리스트 보여주거나 다시 돌아가거나
  useEffect(() => {
    if (mark.includes(moment(selectedDate).format("YYYY-MM-DD"))) {
      setShowTime(true);
    } else {
      setShowTime(false);
    }
  }, [selectedDate, mark]);

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
        value={selectedDate}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        tileClassName={({ date }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
        }}
        onClickDay={(date) => {
          onChange(date);
          toggleTimeScheduleModal();
        }}
      />
      {/* <SelectedTime showTime={showTime} date={selectedDate} /> */}
      <TimeSchedule
        isOpen={isTimeScheduleOpen}
        toggle={toggleTimeScheduleModal}
      />
      <SelectedTime showTime={showTime} date={selectedDate} />
    </div>
  );
}
