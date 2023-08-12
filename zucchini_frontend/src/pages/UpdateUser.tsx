import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { motion } from "framer-motion";

export default function UpdateUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password"); // "password" 필드의 값을 감시

  /*
   * 이메일 인증 다시?
   * 비번 빼고 기존 정보 채워주는 통신 필요
   * 닉네임 중복확인 통신, 로직필요
   * 비번 전과 동일한 형식인지 통신, 로직필요
   */

  const onSubmit = (data: any) => {
    // 제출 통신 필요

    alert(JSON.stringify(data));
  };
  return (
    <StyledAll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledDiv>
        <StyledTitle>회원정보 수정</StyledTitle>
        <StyledSpanDiv>
          <StyledSpan>아이디와 이름은 변경이 불가합니다.</StyledSpan>
          <StyledSpan>
            수정할 내용을 재작성 후 저장 버튼을 눌러주세요.
          </StyledSpan>
        </StyledSpanDiv>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
              },
              maxLength: {
                value: 16,
                message: "비밀번호는 16자 이하여야 합니다.",
              },
            })}
          />
          <StyledMessage>
            <ErrorMessage errors={errors} name="password" />
          </StyledMessage>
          <Input
            type="password"
            placeholder="비밀번호 재확인"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
          />
          <StyledMessage>
            <ErrorMessage errors={errors} name="passwordConfirmation" />
          </StyledMessage>
          <Input
            type="email"
            placeholder="이메일"
            {...register("email", { required: true })}
          />
          <Input
            type="number"
            placeholder="휴대폰번호(- 없이 입력해주세요)"
            {...register("phoneNumber", { required: true })}
          />
          <Input
            type="text"
            placeholder="닉네임"
            {...register("nickname", { required: true })}
          />
          <StyledButtonDiv>
            <StyledButton>수정</StyledButton>
            {/* 취소버튼 어디로 갈 지 안 정함 */}
            {/* <StyledButton>취소</StyledButton> */}
          </StyledButtonDiv>
          <RedBtn>탈퇴</RedBtn>
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
  // width: 15rem;
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
  &:hover {
    background-color: red;
    cursor: pointer;
    color: white;
  }
`;
