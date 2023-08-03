import { useEffect, useState } from "react";
import { Button } from "../Common/Button";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 우선 갖다놓는 날짜(임시, 테스트용.)
// DB에서 해당 아이템,  해당 날짜에 해당하는 시간을 불러오는 로직 구현하기.
// 아래 functions 안에서!

export default function Times({ clickedDate, mark, setFixedSchedule }: any) {
  // clickedDate에 해당하는 시간들 담을 배열
  // const [times, setTimes] = useState([]);
  const navigate = useNavigate();

  const times = ["08:00", "09:00", "10:00", "14:00", "15:00"]; // 임시 시간표
  // 통신을 통해 setMark는 캘린더에서 완료해서 넣어준 것.
  // 그 중 date랑 동일한 date의 시간 뽑아내기(clickedDate바뀔 때마다) > to setTime
  // props로 넘어온 date로 해당 날짜의 시간을 불러오는 로직.
  // useEffect(() => {
  //   const timesOftheDay = mark.reduce((arr: any, m: any) => {
  //     if (m.getDate === clickedDate) {
  //       arr.push(`${m.getHours}:${m.getMinutes}`);
  //     }
  //   }, []);
  //   setTimes(timesOftheDay);
  // }, [clickedDate, mark]);

  // 시간 버튼 클릭 시
  const onClick = async (event: any) => {
    try {
      alert(event);
      // 버튼 안의 시간입니다. 아래.
      const clickedTime = event.target.__reactProps$b6fnnl23hn.children;
      // 해당 시간 보내서 예약하는 로직 로직
      // /api/reservation/check
      // if (confirm("예약을 확정하시겠습니까?")) {
      //   setFixedSchedule(event);
      //   // FixedScedule 보내고...
      // }
      await axios
        .post(
          "http://localhost:8080/api/reservation/check",
          { selectDate: new Date(`${clickedDate}T${clickedTime}`) }
          // {
          //   // headers: {
          //   //   Authorization: access
          //   // },
          // }
        )
        .then((response) => {
          if (response.status === 0) {
            // 예약 불가능(구매자가 다른 구매 예약해놨을 때)
            // 구매자의 판매 일정도 확정이라면 여기에 넣어야할 것 같은데??
          } else if (response.status === 1) {
            // 예약 가능하지만 구매자가 등록한 판매 상품의 날짜 목록이랑 겹침
            alert(
              "내가 판매 중인 상품에 등록된 일정과 겹칩니다. 이전에 등록한 일정을 지우고 이 예약을 확정하시겠습니까?"
            );

            // const keepGoing = confirm(
            //   "내가 판매 중인 상품에 등록된 일정과 겹칩니다. 이전에 등록한 일정을 지우고 이 예약을 확정하시겠습니까?"
            // );
            // if (keepGoing) {
            //   onConfirm();
            // } else {
            //   return;
            // }
          } else if (response.status === 2) {
            // 바로 예약
            alert("예약이 확정되었습니다.");
          }
        });

      // 그리고 확정 됐으니 확정된 건 보여주고 나머지 비활.
      // fixed schedule을 써야할까?
      // 더 쉽게 하려면 끄기. 비활은 필요...
    } catch (error) {
      console.error(error);
    }
  };
  //
  const onConfirm = async () => {
    try {
      await axios.post("http://localhost:8080/api/reservation/confirm");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {times.map((time) => {
        return (
          <div>
            <Button Size="extraSmall" onClick={onClick}>
              {/* time형식이 date일테니 time.getTime을 format으로... */}
              {time}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
