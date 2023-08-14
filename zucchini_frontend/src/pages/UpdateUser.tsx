import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { motion } from "framer-motion";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UpdateUser() {
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

    alert(JSON.stringify(data));
  };

  const navigate = useNavigate();

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      // 회원 탈퇴 api
      const response = await api.delete(`http://localhost:8080/api/user`);
      if (response.status === 204) {
        alert("그동안 애호박 마켓을 이용해주셔서 감사합니다..");
        // 탈퇴 후 메인 페이지로 리다이렉트
        navigate("/main");
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
            {...register("nickname", { required: true })}
          />
          <Input
            type="number"
            placeholder="휴대폰번호(- 없이 입력해주세요)"
            {...register("phoneNumber", { required: true })}
          />
          <GenderSelect
            defaultValue={""}
            {...register("gender", { required: true })}
          >
            <option value="">-- 성별 선택 --</option>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="none">선택 안함</option>
          </GenderSelect>

          <StyledButtonDiv>
            <StyledButton>수정</StyledButton>
          </StyledButtonDiv>
          <RedBtn onClick={handleDeleteButtonClick}>탈퇴</RedBtn>
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

const RedBtn = styled.button`
  background-color: white;
  border-radius: 0.4rem;
  color: red;
  height: 2.9rem;
  border: 2px solid red;
  cursor: pointer;
  margin: 0.3rem;
  font-size: 1rem;
  &:hover {
    background-color: red;
    cursor: pointer;
    color: white;
  }
`;

const GenderSelect = styled.select`
  height: 3rem;
  margin: 0.3rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  padding-left: 0.4rem;
`;
