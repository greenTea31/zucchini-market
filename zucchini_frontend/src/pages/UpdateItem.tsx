import styled from "styled-components";
import Modal from "../components/Common/Modal";
import { useEffect, useState } from "react";
import SimpleCalendarRegister from "../components/Schedule/SimpleCalendarRegister";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ClosedButton from "../components/Button/ClosedButton";
import dayjs from "dayjs";
import axios from "axios";
import { Button } from "../components/Common/Button";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import api from "../utils/api";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants/url";
import { useLocation } from "react-router-dom";

interface IDate {
  date: string;
  status: number;
}
interface IItem {
  no: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  price: number;
  status: number;
  imageList: string[];
  likeCount: number;
  dateList: IDate[];
  categoryList: string[];
  view: number;
}

export default function UpdateItem() {
  const token = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [item, setItem] = useState<IItem>();

  const [isOpen, setIsOpen] = useState(false);

  // 마우스로 선택한 날짜 받는 state
  const [clickedTime, setClickedTime] = useState(new Date());

  // 판매자가 선택한 시간들 차곡차곡 담아주기
  const [selectedTimes, setSelectedTimes] = useState<any>([]);

  const location = useLocation();
  // 아이템 가져오기
  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await api.get(
          `item/${location.pathname.split("/")[2]}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getItem();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
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
  };

  // 선택한 시간 삭제
  const removeTime = (timeToRemove: Date) => {
    const updatedTimes = selectedTimes.filter(
      (time: Date) => time !== timeToRemove
    ); // 배열의 각 요소인 time(Date 객체)가 timeToRemove와 같지 않은지 검사
    // 같지 않다면 true, 같으면 false 반환
    // timeToRemove와 같지 않은 요소들만 남긴 새로운 배열 생성
    setSelectedTimes(updatedTimes); // 새로운 배열 업데이트
  };

  const navigate = useNavigate();
  //진짜 제출
  const onSubmit = async (data: any) => {
    console.log("등록등록");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("price", data.price);

    // 일정들
    for (let i = 0; i < selectedTimes.length; i++) {
      formData.append("dateList", selectedTimes[i]);
    }

    const response = await api.put(`/item/${item?.no}`, {
      title: data.title,
      content: data.content,
      price: data.price,
      dateList: data.selectedTimes,
    });

    const item_no = response.data;
    navigate(`/item/${item_no}`);
  };

  return (
    <ContainerAll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton onClick={toggle} />
        </ModalDiv>
        <ModalSpan>화상통화 일정 선택</ModalSpan>
        <CalendarDiv>
          <SimpleCalendarRegister
            clickedTime={clickedTime}
            setClickedTime={setClickedTime}
            toggle={toggle}
          />
        </CalendarDiv>
        <TimeContainerDiv>
          {selectedTimes.map((selectedTime: Date) => {
            const formattedTime = dayjs(selectedTime).format(
              "YYYY년 MM월 DD일 HH시 mm분"
            );
            return (
              <TimeDiv key={formattedTime}>
                {formattedTime}
                <TimeSvg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="red"
                  className="w-6 h-6"
                  onClick={() => removeTime(selectedTime)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </TimeSvg>
              </TimeDiv>
            );
          })}
        </TimeContainerDiv>
        <StyledBtn onClick={addTime}>추가</StyledBtn>
        <StyledBtn onClick={() => toggle()}>완료</StyledBtn>
      </Modal>
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <TitleSpan>내 물건 팔기</TitleSpan>
        <ContentDiv>
          <ContentSpan>제목</ContentSpan>
          <ContentInput
            defaultValue={item?.title}
            {...register("title", {
              required: item?.title ? undefined : "제목을 입력해주세요.",
              maxLength: 80,
            })}
            maxLength={80}
          ></ContentInput>
          <StyledMessage>
            <ErrorMessage errors={errors} name="title" />
          </StyledMessage>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>상세 설명</ContentSpan>
          <ContentTextArea
            defaultValue={item?.content}
            maxLength={1000}
            {...register("content", {
              required: item?.content ? undefined : "설명을 입력해주세요.",
            })}
          ></ContentTextArea>
          <StyledMessage>
            <ErrorMessage errors={errors} name="content" />
          </StyledMessage>
        </ContentDiv>
        <ContentDiv>
          <ContentSpan>가격</ContentSpan>
          <ContentInput
            type="number"
            defaultValue={item?.price}
            {...register("price", {
              required: item?.price ? undefined : "가격을 입력해주세요",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "잘못된 값입니다.",
              },
            })}
          ></ContentInput>
          <StyledMessage>
            <ErrorMessage errors={errors} name="price" />
          </StyledMessage>
        </ContentDiv>
        <ButtonDiv>
          <StyledButton type="button" onClick={toggle}>
            일정 선택
          </StyledButton>
          <StyledButton>등록</StyledButton>
        </ButtonDiv>
      </ContainerForm>
    </ContainerAll>
  );
}
const ContainerAll = styled(motion.div)`
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

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const StyledMessage = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 0.3;
  margin: 0.3rem;
  color: tomato;
`;

const ContentTextArea = styled.textarea`
  height: 12rem;
  width: 100%;
  border-radius: 0.4rem;
  border: transparent;
  font-size: 1rem;
  padding-left: 0.7rem;
  background-color: #f4f4f4;
  resize: none;
  overflow-y: auto;

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
  font-size: 1rem;

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
  margin-top: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: white;
  }
`;

const TimeContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 35rem;
`;

const TimeDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  border: solid 1px black;
  padding: 1rem;
  width: 15rem;
`;

const TimeSvg = styled.svg`
  height: 1.3rem;
  width: 1.3rem;
  cursor: pointer;
`;
