import SelectedTimes from "./SelectedTimes";

// times들을 뿌려주자
export default function SelectedTime(props: any) {
  return (
    <div>
      {props.showTime ? (
        <SelectedTimes
          itemNo={props.itemNo}
          clickedDate={props.clickedDate}
          mark={props.mark}
          myNickname={props.myNickname}
          sellerNickname={props.sellerNickname}
        />
      ) : null}
    </div>
  );
}
