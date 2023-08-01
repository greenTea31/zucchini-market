import ClosedButton from "../Button/ClosedButton";
import Modal from "../Common/Modal";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { useEffect, useState } from "react";
import moment from "moment";

export default function TimeSchedule({
  isOpen,
  toggle,
  date,
  selectedTimes,
  setSelectedTimes,
}: any) {
  // 시계에서 시간 선택 후 확인 누르면...
  const onClick = () => {
    // 시간 선택했을 때만 넣어주기
    // 이미 선택된 시간인지도 확인하는 로직 필요...
    if (value) {
      setSelectedTimes([...selectedTimes, new Date(`${date}T${value}`)]);
    }

    // 선택된 시간 비워주고
    setValue("");
    // 닫아
    toggle();
  };

  useEffect(() => {
    console.log(selectedTimes);
  }, [selectedTimes]);
  // 시계에서 선택된 시간 넣어주자
  const [value, setValue] = useState("");

  // 시계에서 시간 굴릴 때마다 value 새로 넣어주기.
  const onChange = (event: any) => {
    const time = new Date(event.$d);
    setValue(moment(time).format("HH:mm:ss"));
  };

  return (
    <ContainerDiv>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton />
        </ModalDiv>
        <ModalSpan>화상통화 시간 선택</ModalSpan>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            componentsProps={{ actionBar: { actions: [] } }}
            orientation="landscape"
            minutesStep={30}
            // disablePast={true}
            onChange={onChange}
          />
        </LocalizationProvider>
        {/* 확인 누르면 API보내서 이미 다른 아이템에서 예약해놓은 시간인지 확인
         * + 이 아이템 안에서 이미 선택한 시간인지 확인(state)
         * = 중복확인 두 개!
         * + 통과하면 state에 저장
         * 우선 state저장부터 만들어놓을게요~
         */}
        <StyledBtn onClick={onClick}>확인</StyledBtn>
        <StyledBtn>취소</StyledBtn>
      </Modal>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 3rem 0 2rem 0;
`;

const StyledBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #cde990;
  border: solid 1px #cde990;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-right: 0.4rem;
  margin-top: 2rem;

  &:hover {
    background-color: white;
  }
`;
