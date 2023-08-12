import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { http } from "../utils/axios";
import { useLogin } from "../hooks/useLogin";
import FullWidthButton from "../components/Button/FullWidthButton";
import { motion } from "framer-motion";

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { mutate: login } = useLogin();

  const onSubmit = async (data: any) => {
    login(data);
  };

  return (
    <StyledAll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledDiv>
        <StyledTitle>로그인</StyledTitle>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="아이디" {...register("id")}></Input>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              minLength: {
                value: 7,
                message: "뭐임?",
              },
            })}
          ></Input>
          {errors?.password && (
            <span>{errors?.password?.message?.toString()}</span>
          )}
          <StyledButtonDiv>
            <FullWidthButton>로그인</FullWidthButton>
          </StyledButtonDiv>
        </StyledForm>
        <StyledSpanDiv>
          <StyledSpan>아직 애호박 멤버가 아니신가요?</StyledSpan>
          <StyledSpan>회원가입하고 더 많은 서비스를 경험해보세요!</StyledSpan>
          <StyledLink to="/signup">회원가입</StyledLink>
        </StyledSpanDiv>
      </StyledDiv>
    </StyledAll>
  );
}

interface IUser {
  id: string;
  password: string;
}

async function login(data: any) {
  const response = await http.post("user/login", data);

  return response;
}

const StyledAll = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  width: 20rem;
  margin: 4rem;
  text-align: center;
  padding-top: 3rem;
`;

const StyledTitle = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
  margin: 1rem;
`;

const StyledSpanDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.7rem;
`;

const StyledSpan = styled.span`
  line-height: 1.3rem;
  color: gray;
  font-size: smaller;
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
`;

const StyledButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.7rem;
`;

const StyledLink = styled(Link)`
  box-sizing: border-box;
  display: block;
  padding: 4px 8px;
  margin: 0 auto;
  text-align: center;
  margin-top: 0.7rem;
  color: blue;
  font-weight: 600;
`;
