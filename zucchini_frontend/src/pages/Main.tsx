import styled from "styled-components";
import img from "../assets/images/main.png";
import { Link } from "react-router-dom";

export default function Main() {
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
            <Link to={"/signup"}>
              <SignUpBtn>회원가입</SignUpBtn>
            </Link>
            <Link to={"/login"}>
              <LoginBtn>로그인</LoginBtn>
            </Link>
          </BtnDiv>
        </UpperLeft>
        <Img src={img}></Img>
      </MainUpper>
      <LowerDiv>
        <AboutTitle>여러가지 기능을 한 곳에</AboutTitle>
        <SpanContent>
          우리는 최고의 중고 거래 경험을 제공하기 위해 최신 기술과
        </SpanContent>
        <SpanContent>편리한 서비스를 결합한 플랫폼을 제공합니다.</SpanContent>
        <SpanContent>
          아래는 저희 사이트의 주요 특징과 장점을 소개해 드리겠습니다.
        </SpanContent>
        <MainLower>
          <ContentDiv>
            <BoldSpan>
              <SvgDiv>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </SvgDiv>
              영상 기록 보관 기능
            </BoldSpan>
            <div>
              <SubDiv>
                <SpanContent>
                  판매자와 구매자는 거래 완료 후 2주 동안 화상통화 기록을 사이트
                  내에서 확인할 수 있습니다. 이 기간동안 거래 당사자들은 필요한
                  경우 거래 내용을 다시 확인하고 필요한 조치를 취할 수 있습니다.
                </SpanContent>
              </SubDiv>
            </div>
            <div>
              <LowerBtn>
                <Link to={"/mypage/buy"}>영상 목록</Link>
              </LowerBtn>
            </div>
          </ContentDiv>
          <ContentDiv>
            <BoldSpan>
              <SvgDiv>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </SvgDiv>
              화상통화 기능
            </BoldSpan>
            <SubDiv>
              <SpanContent>
                실시간으로 판매자와 구매자가 화상통화를 통해 상품에 대해 직접
                대화할 수 있습니다. 이를 통해 상품의 상태를 확인하고 실제로
                작동하는지 확인할 수 있습니다.
              </SpanContent>
            </SubDiv>
            <div>
              <Link to={"/conference"} target={"_blank"}>
                <LowerBtn>영상 통화</LowerBtn>
              </Link>
            </div>
          </ContentDiv>
          <ContentDiv>
            <BoldSpan>
              <SvgDiv>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </SvgDiv>
              일정 조율 기능
            </BoldSpan>
            <SubDiv>
              <SpanContent>
                판매자와 구매자는 화상 통화 일정을 서로 조율할 수 있습니다.
                사이트 내의 채팅 기능을 통해 원하는 일정을 협의하고 약속할 수
                있습니다. 이를 통해 양측은 편리한 시간에 화상 통화를 진행하며
                상품에 대한 자세한 정보를 확인할 수 있습니다.
              </SpanContent>
            </SubDiv>
            <div>
              <LowerBtn>
                <Link to={"/mypage/schedule"}>일정 목록</Link>
              </LowerBtn>
            </div>
          </ContentDiv>
        </MainLower>
      </LowerDiv>
    </MainAll>
  );
}

const MainAll = styled.div`
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const MainUpper = styled.div`
  height: 38rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #aacb73;
`;

const MainLower = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const LowerDiv = styled.div`
  height: 38rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 2.6rem;
`;

const ContentDiv = styled.div`
  width: 15rem;
  height: 20rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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
`;

const SpanTitle = styled.span`
  font-size: 3.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1rem;
`;

const SpanContent = styled.span`
  font-size: 1rem;
  line-height: 150%;
`;

const BoldSpan = styled.span`
  line-height: 150%;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const BtnDiv = styled.div`
  margin-top: 1rem;
`;

const SignUpBtn = styled.button`
  width: 8rem;
  height: 2.8rem;
  border: none;
  color: #aacb73;
  font-weight: 600;
  border-radius: 2rem;
  margin-right: 1rem;
  box-shadow: 0 0 10px white;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background-color: #aacb73;
    border: solid 1px white;
    color: white;
  }
`;

const LoginBtn = styled.button`
  width: 8rem;
  height: 2.8rem;
  border: solid 1px white;
  color: white;
  background-color: #aacb73;
  font-weight: 600;
  border-radius: 2rem;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background-color: white;
    border: solid 1px #aacb73;
    color: #aacb73;
  }
`;

const Img = styled.img`
  width: 40rem;
  height: 35rem;
`;

const AboutTitle = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: center;
`;

const LowerBtn = styled.button`
  background-color: #ffd4d4;
  border: none;
  height: 2.5rem;
  width: 8rem;
  border-radius: 2rem;
  margin-top: 1.5rem;

  &:hover {
    cursor: pointer;
    background-color: white;
    border: solid 2px #ffd4d4;
  }
`;

const SvgDiv = styled.div`
  width: 24px;
  height: 24px;
  color: #006aff;
`;

const SubDiv = styled.div`
  min-height: 10rem;
`;
