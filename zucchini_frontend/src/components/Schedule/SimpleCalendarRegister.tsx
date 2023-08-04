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

export default function SimpleCalendar({ clickedTime, setClickedTime }: any) {
  // 선택한 날짜로 date 바꿔주고
  const onChange = (event: any) => {
    console.log(event);
    setClickedTime(event);
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
          // disablePast={true}
          onChange={onChange}
          value={dayjs(clickedTime)}
          defaultValue={dayjs(new Date())}
        />
      </LocalizationProvider>
    </div>
  );
}
