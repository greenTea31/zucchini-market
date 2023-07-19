import styled from "styled-components";

export default function UpdateUser() {
  const StyledAll = styled.div`
    display: flex;
    justify-content: center;
    height: auto;
    font-family: "IBM Plex Sans KR", sans-serif;
    // border: solid pink;
  `;

  const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    margin: 4rem;
    text-align: center;
    // border: solid green;
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

  return (
    <StyledAll>
      <StyledDiv>
        <StyledTitle>회원정보 수정</StyledTitle>
        <StyledSpanDiv>
          <StyledSpan>아이디와 이름은 변경이 불가합니다.</StyledSpan>
          <StyledSpan>
            수정할 내용을 재작성 후 저장 버튼을 눌러주세요.
          </StyledSpan>
        </StyledSpanDiv>
        <InputDiv>
          <Input type="password" placeholder="비밀번호" />
          <Input type="password" placeholder="비밀번호 재확인" />
          <Input type="email" placeholder="이메일" />
          <Input type="number" placeholder="휴대폰번호(- 없이 입력해주세요)" />
          <Input type="text" placeholder="닉네임" />
        </InputDiv>
        <StyledButtonDiv>
          <StyledButton>수정</StyledButton>
          <StyledButton>취소</StyledButton>
        </StyledButtonDiv>
      </StyledDiv>
    </StyledAll>
  );
}
