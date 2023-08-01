import SelectedTimes from "./SelectedTimes";

// times들을 뿌려주자
export default function SelectedTime(props: any) {
  return (
    <div>
      {props.showTime ? (
        <SelectedTimes
          date={props.date}
          mark={props.mark}
          setMark={props.setMark}
        />
      ) : null}
    </div>
  );
}
