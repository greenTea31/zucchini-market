import { useState } from "react";
import { Button } from "../Common/Button";
import styled from "styled-components";

// 우선 갖다놓는 날짜(임시, 테스트용.)
// DB에서 해당 아이템,  해당 날짜에 해당하는 시간을 불러오는 로직 구현하기.
// 아래 functions 안에서!
const times = ["08:00", "09:00", "10:00", "14:00", "15:00"];

export default function Times(props: any) {
  // time컴포넌트에서 부모에게서 받은 date(+times) props를 times에 props들을 넘겨줄 것이당.

  //props로 넘어온 date로 해당 날짜의 시간을 불러오는 로직을 구현할 것.
  const onClick = (event: any) => {
    alert("예약하시겠습니까?");
    // 해당 시간 보내서 예약하는 로직 로직

    // 그리고 확정 됐으니 확정된 건 보여주고 나머지 비활.
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
