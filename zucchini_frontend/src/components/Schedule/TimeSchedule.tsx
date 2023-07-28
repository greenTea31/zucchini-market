import ClosedButton from "../Button/ClosedButton";
import Modal from "../Common/Modal";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

export default function TimeSchedule({ isOpen, toggle }: any) {
  return (
    <ContainerDiv>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton />
        </ModalDiv>
        <ModalSpan>화상통화 시간 선택</ModalSpan>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["StaticTimePicker"]}>
            <DemoItem label="시간을 선택해주세요">
              <StaticTimePicker
                componentsProps={{ actionBar: { actions: [] } }}
                defaultValue={dayjs("2022-04-17T15:30")}
                sx={{ justifyContent: "center" }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            componentsProps={{ actionBar: { actions: [] } }}
            orientation="landscape"
          />
        </LocalizationProvider>
        <StyledBtn>확인</StyledBtn>
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
