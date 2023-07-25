import styled from "styled-components";
import female from "../assets/images/female.jpg";
import cycle from "../assets/images/cycle.png";

export default function Conference() {
  return (
    <ContainerDiv>
      <UpperDiv>
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="blue"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </StyledSvg>

        <TitleDiv>
          <SellerName>
            (새상품) 나이키 리액트 인피니티 런 플라이니트2 팝니다
          </SellerName>
          <SubSpan>2023년 07월 24일 17:41</SubSpan>
        </TitleDiv>
        <SellerDiv>
          <SellerImg src={female}></SellerImg>
          <SellerInfoDiv>
            <span>백조이김</span>
            <span>Lv.1 애호박씨앗</span>
          </SellerInfoDiv>
        </SellerDiv>
      </UpperDiv>
      <LowerDiv>
        <LeftDiv>
          <LeftUpperDiv>
            <MainImg src={cycle} />
            <NameTag>백조이김</NameTag>
            <SubImg>
              <ParticipantDiv>
                <NameTag>김보연</NameTag>
                <ParticipantImg src={female} />
              </ParticipantDiv>
              <ParticipantDiv>
                <NameTag>이상호</NameTag>
                <ParticipantImg src={female} />
              </ParticipantDiv>
              <ParticipantDiv>
                <NameTag>김경희</NameTag>
                <ParticipantImg src={female} />
              </ParticipantDiv>
            </SubImg>
          </LeftUpperDiv>
          <LeftLowerDiv>
            <EndBtn>통화 종료</EndBtn>
            <IconsDiv>
              <IconBtn>
                <Svg
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
                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                  />
                </Svg>
              </IconBtn>
              <IconBtn>
                <Svg
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
                </Svg>
              </IconBtn>
              <IconBtn>
                <Svg
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
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                  />
                </Svg>
              </IconBtn>
              <IconBtn>
                <Svg
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
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </Svg>
              </IconBtn>
              <IconBtn>
                <Svg
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
                    d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                  />
                </Svg>
              </IconBtn>
            </IconsDiv>
            <BuyBtn>구매하기</BuyBtn>
          </LeftLowerDiv>
        </LeftDiv>
        <RightDiv>
          <RightUpperDiv>
            <ParticipantInfoDiv>
              <ParticipantInfoImg></ParticipantInfoImg>
              <ParticipantInfoSpan></ParticipantInfoSpan>
              <IconBtn>
                <Svg
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
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                  />
                </Svg>
              </IconBtn>
            </ParticipantInfoDiv>
            <div></div>
            <div></div>
          </RightUpperDiv>
          <RightLowerDiv></RightLowerDiv>
        </RightDiv>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 5rem 5rem 5rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const UpperDiv = styled.div`
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  border: solid 1px #cbcbcb;
  align-items: center;
`;

const LowerDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 40rem;
`;

const LeftDiv = styled.div`
  width: 70%;
  background-color: #e2e2e2;
`;

const RightDiv = styled.div`
  width: 30%;
  background-color: #f1f1f1;
  border: solid 1px #f1f1f1;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 0.5rem;
`;

const SubSpan = styled.span`
  color: gray;
  font-size: 0.9rem;
`;

const SellerName = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
`;

const StyledSvg = styled.svg`
  width: 3rem;
  height: 3rem;
`;

const SellerInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
`;

const SellerDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: #ececec;
  padding: 1.5rem;
  border-radius: 3rem;
`;

const SellerImg = styled.img`
  height: 3rem;
  width: 3rem;
  border: solid 1px black;
  border-radius: 3rem;
`;

const LeftUpperDiv = styled.div`
  height: 85%;
  display: flex;
  padding: 2rem;
  gap: 1.5rem;
`;

const LeftLowerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background-color: white;
  border: solid 1px #ececec;
`;

const RightUpperDiv = styled.div`
  height: 85%;
  padding: 2rem;
`;

const RightLowerDiv = styled.div`
  height: 15%;
  background-color: white;
  border: solid 1px #ececec;
`;

const MainImg = styled.img`
  position: relative;
  width: 70%;
  border-radius: 1rem;
`;

const SubImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
`;

const ParticipantImg = styled.img`
  width: 100%;
  height: 10rem;
  border-radius: 1rem;
`;

const ParticipantDiv = styled.div`
  border-radius: 1rem;
`;

const EndBtn = styled.button`
  height: 3.2rem;
  width: 7rem;
  border-radius: 2rem;
  background-color: red;
  border: solid 2px red;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: solid 2px red;
    color: red;
  }
`;

const BuyBtn = styled.button`
  height: 3.2rem;
  width: 7rem;
  border-radius: 2rem;
  background-color: green;
  border: solid 2px green;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: solid 2px green;
    color: green;
  }
`;

const IconsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 17rem;
`;

const Svg = styled.svg`
  width: 24px;
  height: 24px;
  color: #006aff;
  margin-top: 0.3rem;
`;

const IconBtn = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  border: transparent;
  background-color: #d7f0f9;
  cursor: pointer;
`;

const NameTag = styled.span`
  position: absolute;
  padding: 1rem 2rem;
  margin: 1rem;
  border-radius: 2rem;
  letter-spacing: 0.15rem;
  color: white;
  background-color: rgb(0, 0, 0, 0.6);
`;

const ParticipantInfoDiv = styled.div``;

const ParticipantInfoSpan = styled.span`
  /* dis */
`;

const ParticipantInfoImg = styled.img``;
