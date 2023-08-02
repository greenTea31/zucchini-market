import styled from "styled-components";
import Modal from "../components/Common/Modal";
import { useState } from "react";
import SimpleCalendarRegister from "../components/Schedule/SimpleCalendarRegister";
import ImageUpload from "../FileUpload/ImageUpload";
import DragDrop from "../FileUpload/DragDrop";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function CreateItem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [isOpen, setIsOpen] = useState(false);

  const [selectedTimes, setSelectedTimes] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //화상 일정 선택 완료
  const clickSubmit = () => {
    // 그냥 나가면 될까?
    // selectedTimes는 이미 채워진 상태
    if (selectedTimes.length !== 0) {
      alert("등록완료");
      toggle();
    } else {
      alert("선택된 일정이 없습니다.");
    }
  };

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    const formData = new FormData();
    //스케줄에만
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);

    selectedTimes.map((selectedTime, index) =>
      formData.append("schedule" + index, selectedTime)
    ); // 이상한 거 나도 알아요 고쳐야지
  };

  //   const formData = new FormData();
  //   //스케줄에만
  //   formData.append();
  // };
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
          {/* 판매자 등록을 위한 달력 따로 */}
          <SimpleCalendarRegister
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
          />
        </CalendarDiv>
        {/* 선택된 시간 보여주기 */}
        {/* css 부탁해요~~ */}
        <div>
          {selectedTimes.map((selectedTime: Date) => {
            return <div>{selectedTime.toString()}</div>;
          })}
        </div>
        <StyledBtn onClick={clickSubmit}>확인</StyledBtn>
        <StyledBtn onClick={() => toggle()}>취소</StyledBtn>
      </Modal>
      {/* <TimeSchedule isOpen={timeOpen} toggle={timeToggle} /> */}
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <TitleSpan>내 물건 팔기</TitleSpan>
        <ContentDiv>
          <ContentSpan>제목</ContentSpan>
          <ContentInput
            {...register("title", {
              required: "제목을 입력해주세요.",
              maxLength: 200,
            })}
            maxLength={200}
          ></ContentInput>
          {/* <StyledMessage>
            <ErrorMessage errors={errors} name="title" />
          </StyledMessage> */}
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>상세 설명</ContentSpan>
          <ContentTextArea
            {...register("content", { required: "설명을 입력해주세요." })}
          ></ContentTextArea>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>가격</ContentSpan>
          <ContentInput
            type="number"
            placeholder=", 없이 입력해주세요"
            {...register("price", { required: true })}
          ></ContentInput>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>카테고리</ContentSpan>
          <CategorySelect {...register("category", { required: true })}>
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
          <DragDrop />
        </ContentDiv>
        <ButtonDiv>
          <StyledButton onClick={toggle}>일정 선택</StyledButton>
          <StyledButton>등록</StyledButton>
        </ButtonDiv>
      </ContainerForm>
    </ContainerAll>
  );
}
const ContainerAll = styled.div`
  display: flex;
  justify-content: center;
  /* padding: 5rem 0 13rem 0; */
`;

const ContainerForm = styled.form`
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
  margin-top: 1rem;
`;

const ContentDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContentSpan = styled.span`
  color: #5a5a5a;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-size: 1rem;
`;

const ContentInput = styled.input`
  height: 2rem;
  width: 100%;
  padding-left: 0.7rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  border: transparent;
  background-color: #f4f4f4;

  &:focus {
    box-shadow: 0 0 10px #9ec4f2;
    outline: none;
    background-color: white;
  }
`;

const StyledMessage = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 1rem;
  color: tomato;
`;

const ContentTextArea = styled.textarea`
  height: 12rem;
  width: 100%;
  border-radius: 0.4rem;
  border: transparent;
  font-size: 1rem;
  padding: 0.7rem;
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
  border-radius: 0.4rem;
  color: #254021;
`;

const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: #849c80;
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
