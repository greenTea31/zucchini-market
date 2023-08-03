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
import dayjs from "dayjs";

export default function SimpleCalendar() {
  // 마우스로 선택한 날짜 받는 state(tmp data)
  const [clickedDate, setClickedDate] = useState(new Date());

  // Times component 조건부 랜더링에 필요한 boolean값
  const [showTime, setShowTime] = useState(false);

  // 선택된 스케줄 담아줄 것.
  const [myFixedSchedule, setMyFixedSchedule] = useState();

  // 초기값은 임시. 원래 [] 해당 아이템에 대한 판매자가 등록한 날짜 모두 불러오기
  const [mark, setMark] = useState(["2023-07-20", "2023-07-22", "2023-07-24"]);
  const location = useLocation();
  //첫 렌더링에만!
  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/date/${location.pathname.split("/")[2]}`
        );
        console.log(response.data);
        // reponse.data형식이 객체라서 그 안에서 date를 뽑아줘야할 듯.
        // date정보만 새 배열로 만들자. = dates(timestamp로 시간 정보까지 들어있다)
        const dates = response.data.map((item: any) => new Date(item.date));
        // mark배열에 넣어주자.
        setMark(dates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSchedule();
  }, []);

  // 또한, useEffect로 fixedSchedule 와치하다가 date에 api-post통신

  // 선택한 날짜로 date 바꿔주고
  const onChange = (event: any) => {
    setClickedDate(new Date(event));
  };

  // 클릭하면 해당 날짜의 타임리스트 보여주거나 다시 돌아가거나
  useEffect(() => {
    if (mark.includes(dayjs(clickedDate).format("YYYY-MM-DD"))) {
      setShowTime(true);
    } else {
      setShowTime(false);
    }
  }, [clickedDate, mark]);

  return (
    <div>
      <Calendar
        // onchange로 date를 추출해내고
        onChange={onChange}
        value={clickedDate}
        // "일" 빼는 속성
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        // x는 Date타입으로 받아올 거니까 > x.getTime?으로
        tileClassName={({ date }) => {
          if (mark.find((x) => x === dayjs(date).format("YYYY-MM-DD"))) {
            return "possible";
          }
          // else if로 원래 안 되는 날짜()
          // 오늘 전 날짜(원래 안 되는 날짜2)
          // 되는 날이었는데 이미 occupied인 날짜
          // ~className따로 주기
        }}
        onClickDay={(date) => {
          onChange(date);
        }}
      />

      <SelectedTime
        showTime={showTime}
        clickedDate={clickedDate}
        mark={mark}
        setMyFixedSchedule={setMyFixedSchedule}
      />
    </div>
  );
}
