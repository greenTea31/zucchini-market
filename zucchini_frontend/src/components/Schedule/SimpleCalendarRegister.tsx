/*
 * 판매자 등록용 달력
 */
import "./SimpleCalendarDesign.css";
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";

export default function SimpleCalendar({ clickedTime, setClickedTime }: any) {
  // 선택한 날짜로 date 바꿔주고
  const onChange = (event: any) => {
    console.log(event);
    const time = new Date(event.format("YYYY-MM-DD HH:mm:00"));
    setClickedTime(time);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker
          slotProps={{
            actionBar: { actions: [] },
          }}
          orientation="landscape"
          minutesStep={30}
          disablePast={true}
          onChange={onChange}
          value={dayjs(clickedTime)}
          defaultValue={dayjs(new Date())}
        />
      </LocalizationProvider>
    </div>
  );
}
