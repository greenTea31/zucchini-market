import { ReactNode } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <ModalOverlay onClick={props.toggle}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            {props.children}
            <CalendarDiv>
              <Calendar
                formatDay={(locale, date) =>
                  date.toLocaleString("en", { day: "numeric" })
                }
              />
            </CalendarDiv>
            <StyledBtn>확인</StyledBtn>
            <StyledBtn>취소</StyledBtn>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}

const ModalOverlay = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  display: block;
  background: rgb(255, 255, 255);
  width: 28rem;
  height: auto;
  padding: 1rem 1rem 3rem 1rem;
  border-radius: 1rem;
  margin-top: 1%;
  text-align: center;
  border: solid 5px #cde990;
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #cde990;
  border: solid 1px #cde990;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-right: 0.4rem;

  &:hover {
    background-color: white;
  }
`;
