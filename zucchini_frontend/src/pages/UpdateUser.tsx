import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { motion } from "framer-motion";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUser, removeUser, removeUserInfo } from "../hooks/useLocalStorage";
import { getUserInfo } from "../hooks/useUserInfo";
import { BASE_URL } from "../constants/url";

interface IUser {
  id: string;
  nickname: string;
  name: string;
  phone: string;
  gender: boolean | null;
  email: string;
  reportCount: number;
  grade: number;
  dealCount: number;
  isLocked: number;
}

export default function UpdateUser() {
  const [user, setUser] = useState<IUser>(
    JSON.parse(localStorage.getItem("USER_INFO") as string)
  );
  const [nickname, setNickname] = useState(user.nickname);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    // 제출 통신 필요
    console.log(nickname, phone, gender);
    api.put("/user", {
      nickname: nickname,
      phone: phone,
      gender: gender,
    });

    const updatedUser = {
      ...user,
      nickname: nickname,
      phone: phone,
      gender: gender,
    };

    setUser(updatedUser);

    localStorage.setItem("USER_INFO", JSON.stringify(updatedUser));

    navigate("/mypage");
  };

  const navigate = useNavigate();

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      // 회원 탈퇴 api
      const response = await api.delete(BASE_URL + `user`);
      if (response.status === 200) {
        alert("그동안 애호박 마켓을 이용해주셔서 감사합니다..");
        // 탈퇴 후 메인 페이지로 리다이렉트
        removeUser();
        removeUserInfo();
        const now = new Date();
        document.cookie = `zucchiniCookie=; expires=${now.toUTCString()}; path=/;`;
        navigate("/");
      } else {
        throw new Error("회원 탈퇴 실패");
      }
    } catch (error) {
      console.error("회원 탈퇴 중 오류가 발생하였습니다.", error);
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteButtonClick = () => {
    const confirmDelete = window.confirm(
      "정말 애호박마켓을 떠나시겠습니까? 😢"
    );
    if (confirmDelete) {
      handleDeleteAccount();
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === "True") {
      setGender(true);
    } else if (selectedValue === "False") {
      setGender(false);
    } else if (selectedValue === "null") {
      setGender(null);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <StyledAll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledDiv>
        <StyledTitle>회원정보 변경</StyledTitle>
        <StyledSpanDiv>
          <StyledSpan>아이디와 이름은 변경이 불가합니다.</StyledSpan>
          <StyledSpan>
            수정할 내용을 재작성 후 저장 버튼을 눌러주세요.
          </StyledSpan>
        </StyledSpanDiv>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="닉네임"
            defaultValue={user.nickname}
            {...register("nickname", {
              required: true,
              onChange: (value) => {
                handleNicknameChange(value);
              },
            })}
          />
          <Input
            type="text"
            placeholder="휴대폰번호(- 없이 입력해주세요)"
            defaultValue={user.phone}
            {...register("phone", {
              required: true,
              onChange: (value) => {
                handlePhoneChange(value);
              },
            })}
          />
          <GenderSelect
            defaultValue={
              user.gender === null ? "null" : user.gender ? "True" : "False"
            }
            {...register("gender", {
              required: true,
              onChange: (value) => {
                handleGenderChange(value);
              },
            })}
          >
            <option value="">-- 성별 선택 --</option>
            <option value="False">여성</option>
            <option value="True">남성</option>
            <option value="null">선택 안함</option>
          </GenderSelect>

          <StyledButtonDiv>
            <StyledButton>수정</StyledButton>
            <StyledButton onClick={goBack}>취소</StyledButton>
          </StyledButtonDiv>
          <div style={{ marginTop: "0.6rem" }}>
            <RedSpan onClick={handleDeleteButtonClick}>탈퇴하기</RedSpan>
          </div>
        </StyledForm>
      </StyledDiv>
    </StyledAll>
  );
}

const StyledAll = styled(motion.div)`
  display: flex;
  justify-content: center;
  height: auto;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  margin: 4rem;
  text-align: center;
`;

const StyledTitle = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
  margin: 1rem;
`;

const StyledSpanDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  margin: 0.2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
const Input = styled.input`
  height: 3rem;
  border: none;
  background-color: #f8f8f8;
  border-radius: 0.4rem;
  padding-left: 1rem;
  margin: 0.3rem;
  font-size: 1rem;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const StyledMessage = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 1rem;
  color: tomato;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  height: 2.9rem;
  border: 2px solid #cde990;
  border-radius: 0.4rem;
  background-color: white;
  font-size: 1rem;
  margin: 0.3rem;

  &:hover {
    background-color: #cde990;
    cursor: pointer;
  }
`;

const RedSpan = styled.span`
  background-color: white;
  color: red;
  cursor: pointer;
  font-size: 1rem;
  width: 4rem;
  border-bottom: solid 1px red;
`;

const GenderSelect = styled.select`
  height: 3rem;
  margin: 0.3rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  padding-left: 0.4rem;
`;
