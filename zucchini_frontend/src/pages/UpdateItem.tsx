import styled from "styled-components";
import Modal from "../components/Common/Modal";
import { useState } from "react";
import Calendar from "react-calendar";

export default function UpdateItem() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ContainerAll>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </StyledSvg>
        </ModalDiv>
        <ModalSpan>화상통화 일정 선택</ModalSpan>
        <CalendarDiv>
          <Calendar
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
        </CalendarDiv>
        <StyledBtn>확인</StyledBtn>
        <StyledBtn>취소</StyledBtn>
      </Modal>
      <ContainerDiv>
        <IconDiv>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </StyledSvg>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </StyledSvg>
        </IconDiv>
        <TitleSpan>판매글 수정</TitleSpan>
        <ContentDiv>
          <ContentSpan>제목</ContentSpan>
          <ContentInput></ContentInput>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>상세 설명</ContentSpan>
          <ContentTextArea></ContentTextArea>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>가격</ContentSpan>
          <ContentInput
            type="number"
            placeholder=", 없이 입력해주세요"
          ></ContentInput>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>카테고리</ContentSpan>
          <CategorySelect>
            <option selected>-- 물품의 종류를 선택해주세요 --</option>
            <option>전자제품</option>
            <option>가전제품</option>
            <option>의류/잡화</option>
            <option>서적/음반</option>
            <option>애완용품</option>
            <option>기타</option>
          </CategorySelect>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>사진 업로드</ContentSpan>
        </ContentDiv>
        <ButtonDiv>
          <StyledButton onClick={toggle}>일정 선택</StyledButton>
          <StyledButton>수정 완료</StyledButton>
        </ButtonDiv>
      </ContainerDiv>
    </ContainerAll>
  );
}
const ContainerAll = styled.div`
  display: flex;
  justify-content: center;
  font-family: "IBM Plex Sans KR", sans-serif;
  /* padding: 5rem 0 13rem 0; */
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  padding: 4rem;
  margin: 5rem 0 13rem 0;
  box-shadow: 0 5px 5px 5px rgb(222, 222, 222);
`;

const TitleSpan = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ContentDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContentSpan = styled.span`
  color: #5a5a5a;
  margin-bottom: 0.4rem;
  font-size: 1rem;
`;

const ContentInput = styled.input`
  height: 2rem;
  width: 100%;
  font-size: 1rem;
  padding-left: 0.5rem;
  border-radius: 0.4rem;
  border: transparent;
  background-color: #f4f4f4;

  &:focus {
    box-shadow: 0 0 10px #9ec4f2;
    outline: none;
    background-color: white;
  }
`;

const ContentTextArea = styled.textarea`
  height: 12rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.4rem;
  border: transparent;
  background-color: #f4f4f4;

  &:focus {
    box-shadow: 0 0 10px #9ec4f2;
    outline: none;
    background-color: white;
  }
`;

const CategorySelect = styled.select`
  height: 2rem;
  width: 100%;
  font-size: 1rem;
  padding-left: 0.5rem;
  border-radius: 0.4rem;
  color: #254021;
`;

const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: #849c80;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const StyledButton = styled.button`
  height: 2.6rem;
  width: 11rem;
  margin-right: 0.8rem;
  border-radius: 0.4rem;
  background-color: #cde990;
  border: #cde990;
  color: #254021;

  &:hover {
    border: 2px solid #cde990;
    background-color: white;
    cursor: pointer;
  }
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  /* border: solid green; */
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
