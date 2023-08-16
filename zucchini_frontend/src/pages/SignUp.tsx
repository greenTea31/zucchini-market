import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import FullWidthButton from "../components/Button/FullWidthButton";
import { motion } from "framer-motion";
import { http } from "../utils/axios";
import axios from "axios";
import { Button } from "../components/Common/Button";
import { BASE_URL } from "../constants/url";

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

  // 아이디 중복 검사
  const [id, setId] = useState("");
  const [idChecked, setIdChecked] = useState(false);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdChecked(false);
    setId(event.target.value); // Input 값이 변경될 때마다 id 상태 업데이트
  };

  // 이메일 인증
  const [email, setEmail] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [showAuthKeyInput, setShowAuthKeyInput] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailChecked(false);
    setShowAuthKeyInput(false);
    setEmailChecked(false);
    setEmail(event.target.value);
  };

  const handleAuthKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailChecked(false);
    setAuthKey(event.target.value);
  };

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
      // alert(JSON.stringify(data));
      try {
        http.post("user", data);
        navigate("/login");
      } catch (err) {}
    } else {
      alert("약관에 동의해주세요");
    }
  };

  useEffect(() => {
    // agree됐는지 확인용
  }, [agree]);

  // 체크박스 동의
  const clickAgree = () => {
    if (!agree) {
      window.open("/signup/agreement", "_blank");
    }
    setAgree((curr) => !curr);
  };

  // 아이디 중복 검사
  const idCheck = async () => {
    const regex = /^[a-z0-9-_]{8,16}$/;
    if (!id) {
      alert("아이디를 입력해주세요");
      return;
    } else if (!regex.test(id)) {
      alert("아이디 형식이 올바르지 않습니다.");
      return;
    }

    const response = await axios.get(BASE_URL + `user/idCheck/${id}`);
    if (response.data) {
      setIdChecked(true);
      alert("사용 가능한 아이디입니다.");
    } else {
      alert("이미 사용 중인 아이디입니다.");
    }
  };

  // 이메일 전송
  const emailSend = async () => {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    } else if (!regex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const response = await axios.post(BASE_URL + `user/email`, {
      email: email,
    });
    alert("인증 메일이 전송되었습니다.");
    setShowAuthKeyInput(true);
  };

  // 인증번호 인증
  const authKeyCheck = async () => {
    if (!authKey) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    const response = await axios.post(BASE_URL + `user/authCheck`, {
      email: email,
      authKey: authKey,
    });
    if (response.data) {
      setEmailChecked(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <StyledAll
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledDiv>
        <StyledTitle>회원가입</StyledTitle>
        <StyledSpanDiv>
          <StyledSpan>애호박마켓에 오신 것을 환영합니다!</StyledSpan>
          <StyledSpan>회원 정보를 입력해주세요.</StyledSpan>
        </StyledSpanDiv>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputBtnDiv>
            <Input
              type="text"
              placeholder="아이디"
              value={id}
              {...register("id", {
                required: true,
                onChange: (value) => {
                  handleIdChange(value); // 입력 값이 변경될 때 handleIdChange 함수 호출
                },
                pattern: {
                  value: /^[a-z0-9-_]*$/,
                  message: "아이디는 한글, 특수문자를 제외해야합니다.",
                },
                minLength: {
                  value: 8,
                  message: "아이디는 8자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 16,
                  message: "비밀번호는 16자 이하여야 합니다.",
                },
              })}
            />
            <PinkBtn onClick={idCheck} disabled={idChecked} type="button">
              중복확인
            </PinkBtn>
          </InputBtnDiv>
          <StyledMessage>
            <ErrorMessage errors={errors} name="id" />
          </StyledMessage>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              pattern: {
                value: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$)/,
                message:
                  "비밀번호는 영문 대 소문자, 숫자, 특수문자를 사용해야합니다.",
              },
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
            {...register("name", {
              required: true,
              maxLength: {
                value: 20,
                message: "이름은 20자 이하여야 합니다.",
              },
            })}
          />
          <StyledMessage>
            <ErrorMessage errors={errors} name="name" />
          </StyledMessage>
          <Input
            type="text"
            placeholder="닉네임"
            {...register("nickname", {
              required: true,
              pattern: {
                value: /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/,
                message: "닉네임은 특수문자를 제외한 2~10자리여야 합니다.",
              },
            })}
          />
          <StyledMessage>
            <ErrorMessage errors={errors} name="nickname" />
          </StyledMessage>
          <Input
            type="text"
            placeholder="휴대폰번호(-를 입력해주세요)"
            {...register("phone", {
              required: true,
              pattern: {
                value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                message: "휴대폰번호 형식이 올바르지 않습니다.",
              },
            })}
          />
          <StyledMessage>
            <ErrorMessage errors={errors} name="phone" />
          </StyledMessage>
          <GenderSelect
            defaultValue={""}
            {...register("gender", {
              required: true,
            })}
          >
            <option value="">-- 성별 선택 --</option>
            <option value="False">여성</option>
            <option value="True">남성</option>
            <option value="null">선택 안함</option>
          </GenderSelect>
          <InputBtnDiv>
            <Input
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: true,
                onChange: (value) => {
                  handleEmailChange(value);
                },
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
            <PinkBtn onClick={emailSend} type="button">
              인증하기
            </PinkBtn>
          </InputBtnDiv>
          <StyledMessage>
            <ErrorMessage errors={errors} name="email" />
          </StyledMessage>
          {showAuthKeyInput && (
            <>
              <Input
                type="text"
                placeholder="인증번호"
                {...register("authKey", {
                  required: true,
                  onChange: (value) => {
                    handleAuthKeyChange(value);
                  },
                })}
              />
              <PinkBtn onClick={authKeyCheck} type="button">
                인증
              </PinkBtn>
            </>
          )}
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
            <StyledButton disabled={!isValid && !idChecked && !emailChecked}>
              회원가입
            </StyledButton>
            <FullWidthButton onClick={navigateToLogin}>로그인</FullWidthButton>
          </StyledButtonDiv>
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
  min-width: 15rem;
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
  font-size: 0.9rem;
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
  display: flex;
`;

const BoldA = styled.div`
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

const InputBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PinkBtn = styled.button`
  height: 3rem;
  border: 2px solid #ffd4d4;
  border-radius: 0.4rem;
  background-color: white;
  margin: 0.3rem;
  font-size: 1rem;

  &:hover {
    background-color: #ffd4d4;
    cursor: pointer;
  }
`;
