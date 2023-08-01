import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import FullWidthButton from "../components/Button/FullWidthButton";

export default function SignUp() {
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const password = watch("password"); // "password" 필드의 값을 감시

  // 약관 동의 클릭
  const [agree, setAgree] = useState(false);

  // 로그인 페이지로 이동
  const navigateToLogin = () => {
    navigate("/login");
  };
  /*
   * 아이디
   * 닉네임
   * 중복확인 통신, 로직필요
   */

  // 회원가입 버튼 누를  시?
  const onSubmit = (data: any) => {
    // 폼 채우기는 버튼 활성화 여부로 거르므로 약관 동의 확인 후 리다이렉트 및 알럿
    if (agree) {
      // 회원가입 post 통신 로직
      alert(JSON.stringify(data));
    } else {
      alert("약관에 동의해주세요");
    }
  };

  useEffect(() => {
    // agree됐는지 확인용
    console.log(agree);
  }, [agree]);

  // 체크박스 동의
  const clickAgree = () => {
    setAgree((curr) => !curr);
  };

  return (
    <StyledAll>
      <StyledDiv>
        <StyledTitle>회원가입</StyledTitle>
        <StyledSpanDiv>
          <StyledSpan>애호박마켓에 오신 것을 환영합니다!</StyledSpan>
          <StyledSpan>회원 정보를 입력해주세요.</StyledSpan>
        </StyledSpanDiv>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="아이디"
            {...register("id", { required: true })}
          />
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
            type="text"
            placeholder="이름"
            {...register("name", { required: true })}
          />
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
          <Input
            type="email"
            placeholder="이메일"
            {...register("email", { required: true })}
          />
          <GenderSelect {...register("gender", { required: true })}>
            <option value="" selected>
              -- 성별 선택 --
            </option>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="none">선택 안함</option>
          </GenderSelect>
          <CheckboxAll>
            <CheckboxDiv>
              <input type="checkbox" id="agreement" onClick={clickAgree} />
              <label htmlFor="agreement">
                <Link to={"/signup/agreement"} target={"_blank"}>
                  <BoldA> (필수) 개인정보 수집 및 이용에 관한 동의서</BoldA>
                </Link>
              </label>
            </CheckboxDiv>
          </CheckboxAll>
          <StyledButtonDiv>
            {/* 폼이 채워지지 않으면 회원가입 버튼 비활성화 */}
            <StyledButton disabled={!isValid}>회원가입</StyledButton>
            <FullWidthButton onClick={navigateToLogin}>로그인</FullWidthButton>
          </StyledButtonDiv>
        </StyledForm>
      </StyledDiv>
    </StyledAll>
  );
}
const StyledAll = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 22rem;
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
  margin-top: 0.7rem;
`;

const StyledButton = styled.button`
  height: 3rem;
  border: 2px solid #cde990;
  border-radius: 0.4rem;
  background-color: white;
  margin: 0.3rem;
  font-size: 1rem;

  &:hover {
    background-color: #cde990;
    cursor: pointer;
  }
`;

const CheckboxAll = styled.div`
  display: flex;
  justify-content: center;
`;

const CheckboxDiv = styled.div`
  margin: 0.5rem;
  font-size: smaller;
`;

const BoldA = styled.a`
  color: blue;
  font-size: 1rem;
`;

const GenderSelect = styled.select`
  height: 3rem;
  margin: 0.3rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  padding-left: 0.4rem;
`;
