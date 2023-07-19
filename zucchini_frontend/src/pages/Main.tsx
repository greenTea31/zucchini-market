import styled from "styled-components";
import Form from "../components/Form";
import { Input, Button } from "../components/Form";

export default function Main() {
  const MainAll = styled.div`
    font-family: "IBM Plex Sans KR", sans-serif;
  `;

  const MainUpper = styled.div`
    height: 40rem;
    display: flex;
    flex-direction: row;
    background-color: #aacb73;
  `;

  const MainLower = styled.div``;

  const UpperLeft = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 6rem;
  `;

  const TitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.8rem;
    /* margin: 0.5rem 3rem; */
  `;

  const SpanTitle = styled.span`
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  `;

  const SpanContent = styled.span`
    font-size: 1rem;
    margin-bottom: 0.4rem;
  `;

  const BtnDiv = styled.div``;

  const SignUpBtn = styled.button`
    width: 8rem;
    height: 2.5rem;
    border: none;
    color: #aacb73;
    font-weight: 600;
    border-radius: 2rem;
    margin-right: 1rem;
  `;

  const LoginBtn = styled.button`
    width: 8rem;
    height: 2.5rem;
    border: solid 1px white;
    color: white;
    background-color: #aacb73;
    font-weight: 600;
    border-radius: 2rem;
  `;

  const Img = styled.image`
    background-image: url("../assets/images/Main.png");
    background-size: cover;
    /* width: 30rem; */
  `;

  return (
    <MainAll>
      <MainUpper>
        <UpperLeft>
          <TitleDiv>
            <SpanTitle>안전하고</SpanTitle>
            <SpanTitle>신뢰성 있는</SpanTitle>
            <SpanTitle>중고거래 플랫폼</SpanTitle>
          </TitleDiv>
          <TitleDiv>
            <SpanContent>
              화상 통화 기능을 활용하면 허위 거래에 대한 위험성을 줄일 수
            </SpanContent>
            <SpanContent>
              있습니다. 거래 파트너와 실제 물건을 확인하고 직접적은 소통을
            </SpanContent>
            <SpanContent>
              통해 애호박 마켓에서 신뢰성 있는 중고거래를 경험해보세요!
            </SpanContent>
          </TitleDiv>
          <BtnDiv>
            <SignUpBtn>회원가입</SignUpBtn>
            <LoginBtn>로그인</LoginBtn>
          </BtnDiv>
        </UpperLeft>
        <Img></Img>
      </MainUpper>
      <MainLower></MainLower>
    </MainAll>
  );
}
