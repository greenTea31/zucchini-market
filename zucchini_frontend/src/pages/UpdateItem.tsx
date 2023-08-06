import styled from "styled-components";
import Modal from "../components/Common/Modal";
import { useEffect, useState } from "react";
import SimpleCalendarRegister from "../components/Schedule/SimpleCalendarRegister";
// import ImageUpload from "../FileUpload/ImageUpload";
import DragDrop from "../FileUpload/DragDrop";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ClosedButton from "../components/Button/ClosedButton";
import dayjs from "dayjs";
import axios from "axios";
import IFileTypes from "../types/IFileTypes";
import { Button } from "../components/Common/Button";
import useAuth from "../hooks/useAuth";
import Calendar from "react-calendar";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";

export default function UpdateItem() {
  const token = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [isOpen, setIsOpen] = useState(false);

  const [files, setFiles] = useState<IFileTypes[]>([]);
  // 마우스로 선택한 날짜 받는 state
  const [clickedTime, setClickedTime] = useState(new Date());

  // 판매자가 선택한 시간들 차곡차곡 담아주기
  const [selectedTimes, setSelectedTimes] = useState<any>([]);

  // 카테고리 전부
  const [allCategories, setAllCategories] = useState([]);
  // 선택한 카테고리
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  // 처음 렌더링될 때, 카테고리 가져올 거예영
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/category`);
        console.log(response);
        setAllCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCategories();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log("눌려?");
  };

  const onChange = (event: any) => {
    if (!selectedCategories.includes(event.target.value)) {
      setSelectedCategories([...selectedCategories, event.target.value]);
    }
  };

  const discardCategory = (e: any) => {
    let reselect;
    [e.target.value, ...reselect] = selectedCategories;
    setSelectedCategories(reselect);
  };

  const addTime = () => {
    // 이미 해당 아이템에서 선택해서 넣어준 시간일 경우
    if (selectedTimes.includes(clickedTime)) {
      alert("이미 선택된 시간입니다");
      return;
    }
    // 중복 체크 통과하면 넣어준다.
    // 30분 반올림하는 것도 추가해야대여....
    // gmt??tlqkf...
    setSelectedTimes([...selectedTimes, clickedTime]);
    alert("추가되었습니다");
  };

  //진짜 제출
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("price", data.price);
    formData.append("categoryList", data.category);
    for (let i = 0; i < selectedCategories.length; i++) {
      formData.append("categoryList", selectedCategories[i]);
    }
    for (let i = 0; i < selectedTimes.length; i++) {
      formData.append("dateList", selectedTimes[i]);
    }
  };

  const check = () => {
    console.log(errors);
  };

  return (
    <ContainerAll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        <TitleSpan>판매글 수정</TitleSpan>
        <ContentDiv>
          <ContentSpan>제목</ContentSpan>
          <ContentInput
            {...register("title", {
              required: "제목을 입력해주세요.",
              maxLength: 200,
            })}
            maxLength={200}
          ></ContentInput>
          <StyledMessage>
            <ErrorMessage errors={errors} name="title" />
          </StyledMessage>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>상세 설명</ContentSpan>
          <ContentTextArea
            {...register("content", { required: "설명을 입력해주세요." })}
          ></ContentTextArea>
          <StyledMessage>
            <ErrorMessage errors={errors} name="content" />
          </StyledMessage>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>가격</ContentSpan>
          <StyledPrice
            type="text"
            placeholder=", 없이 입력해주세요"
            thousandSeparator=","
            suffix={" 원"}
            {...register("price", { required: "가격을 입력해주세요" })}
            onChange={check}
          />
          <StyledMessage>
            <ErrorMessage errors={errors} name="price" />
          </StyledMessage>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>카테고리</ContentSpan>
          {/* 카테고리 여러 개 선택은 나중에 생각할게요~^^ */}
          <div>
            {selectedCategories.map((category: any) => {
              return (
                <Button
                  Size="extraSmall"
                  Variant="filled"
                  style={{
                    padding: "8px",
                    margin: "0.2rem",
                    width: "8rem",
                    borderRadius: "10px",
                  }}
                  onClick={discardCategory}
                >
                  {category}
                </Button>
              );
            })}
          </div>
          <CategorySelect onChange={onChange}>
            <option value="" disabled selected hidden>
              물품의 종류를 선택해주세요
            </option>
            <option value="" disabled selected hidden>
              카테고리
            </option>
            {allCategories.map((category) => {
              return <option>{category}</option>;
            })}
          </CategorySelect>
          <StyledMessage>
            <ErrorMessage errors={errors} name="category" />
          </StyledMessage>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>사진 업로드</ContentSpan>
          <DragDrop files={files} setFiles={setFiles} />
        </ContentDiv>
        <ButtonDiv>
          <StyledButton onClick={toggle}>일정 선택</StyledButton>
          <StyledButton>수정 완료</StyledButton>
        </ButtonDiv>
      </ContainerDiv>
    </ContainerAll>
  );
}
const ContainerAll = styled(motion.div)`
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
  font-size: 2rem;
  font-weight: 500;
  margin: 1.5rem 0;
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

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

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

const StyledMessage = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 0.3;
  margin: 0.3rem;
  color: tomato;
  font-size: 0.9rem;
`;

const StyledPrice = styled(NumericFormat)`
  height: 2rem;
  width: 100%;
  font-size: 1rem;
  padding-left: 0.5rem;
  border-radius: 0.4rem;
  border: transparent;
  background-color: #f4f4f4;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  &:focus {
    box-shadow: 0 0 10px #9ec4f2;
    outline: none;
    background-color: white;
  }
`;
