import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

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

  const InputDiv = styled.div`
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

  const StyledButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.7rem;
  `;

  const StyledButton = styled.button`
    height: 2.9rem;
    border: 2px solid #cde990;
    border-radius: 0.4rem;
    background-color: white;
    margin: 0.3rem;

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
  `;

  const GenderSelect = styled.select`
    height: 3rem;
    margin: 0.3rem;
    border-radius: 0.4rem;
  `;

  return (
    <StyledAll>
      <StyledDiv>
        <StyledTitle>회원가입</StyledTitle>
        <StyledSpanDiv>
          <StyledSpan>애호박마켓에 오신 것을 환영합니다!</StyledSpan>
          <StyledSpan>회원 정보를 입력해주세요.</StyledSpan>
        </StyledSpanDiv>
        <InputDiv>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <Input type="password" placeholder="비밀번호 재확인" />
          <Input type="text" placeholder="이름" />
          <Input type="text" placeholder="닉네임" />
          <Input type="number" placeholder="휴대폰번호(- 없이 입력해주세요)" />
          <Input type="email" placeholder="이메일" />
          {/* <CheckboxAll> */}
          {/* <CheckboxDiv>
              <input type="checkbox" id="female" />
              <label htmlFor="female">
                <span> 여성</span>
              </label>
            </CheckboxDiv>
            <CheckboxDiv>
              <input type="checkbox" id="female" />
              <label htmlFor="female">
                <span> 남성</span>
              </label>
            </CheckboxDiv> */}
          {/* <span>성별 :</span> */}
          <GenderSelect>
            <option value="" selected>
              -- 성별 선택 --
            </option>
            <option value="female">여성</option>
            <option value="male">남성</option>
            <option value="none">선택 안함</option>
          </GenderSelect>
          {/* </CheckboxAll> */}
          <CheckboxAll>
            <CheckboxDiv>
              <input type="checkbox" id="female" />
              <label htmlFor="female">
                <BoldA> (필수) 개인정보 수집 및 이용에 관한 동의서</BoldA>
              </label>
            </CheckboxDiv>
          </CheckboxAll>
        </InputDiv>
        <StyledButtonDiv>
          <StyledButton>회원가입</StyledButton>
          <StyledButton onClick={navigateToLogin}>로그인</StyledButton>
        </StyledButtonDiv>
      </StyledDiv>
    </StyledAll>
  );
}
