import styled from "styled-components";
import female from "../assets/images/female.jpg";
import cycle from "../assets/images/cycle.png";
import Chatting from "../components/Chat/Chatting";
import { useState } from "react";
import Modal from "../components/Common/Modal";
import ClosedButton from "../components/Button/ClosedButton";

export default function Conference() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  const toggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const message = {
    id: 1,
    sender: "",
    content: "",
    isRead: false,
    createdAt: "",
  };

  return (
    <ContainerDiv>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton />
        </ModalDiv>
        <ModalSpan>거래 확정하기</ModalSpan>
        <SpanDiv>
          <span>백조이님께서 거래 희망 버튼을 눌렀습니다.</span>
          <span>백조이님과 거래를 확정 하시겠습니까?</span>
          <span>확정을 누르시면 영상종료 후 채팅방으로 이동합니다.</span>
        </SpanDiv>
        <ButtonDiv>
          <GreenBtn>확정</GreenBtn>
          <RedBtn>거절</RedBtn>
        </ButtonDiv>
      </Modal>
      <Modal isOpen={isOpen2} toggle={toggle2}>
        <ModalDiv>
          <ClosedButton />
        </ModalDiv>
        <ModalSpan>사용자 신고</ModalSpan>
        <SpanDiv>
          <ModalSelect>
            <option>-- 신고하는 이유를 선택해주세요 --</option>
            <option>비매너 사용자</option>
            <option>욕설 신고</option>
            <option>성희롱 신고</option>
            <option>거래 / 환불 분쟁 신고</option>
            <option>사기 신고</option>
            <option>기타</option>
          </ModalSelect>
          <ModalTextarea placeholder="상세 사유를 입력해주세요.."></ModalTextarea>
        </SpanDiv>
        <ButtonDiv>
          <RedBtn>신고</RedBtn>
          <GreenBtn>취소</GreenBtn>
        </ButtonDiv>
      </Modal>
      <UpperDiv>
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="blue"
          className="w-6 h-6"
        >
          <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
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
          <SvgButton onClick={toggle2}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            신고
          </SvgButton>
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
            <BuyBtn onClick={toggle}>구매하기</BuyBtn>
          </LeftLowerDiv>
        </LeftDiv>
        <RightDiv>
          <RightUpperDiv>
            <ParticipantInfoDiv>
              <ParticipantInfoImg src={female} />
              <ParticipantInfoName>김보연</ParticipantInfoName>
              <SvgDiv>
                <InfoSvg>
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
                </InfoSvg>
                <InfoSvg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24 16c0 21.2-5.1 41.1-14.2 58.7L416 300.8V256H358.9l-34.5-27c2.9-3.1 7-5 11.6-5h80V192H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zm362.5 407l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4c20.4-2.8 39.7-9.1 57.3-18.2z" />
                </InfoSvg>
              </SvgDiv>
            </ParticipantInfoDiv>
            <ParticipantInfoDiv>
              <ParticipantInfoImg src={female} />
              <ParticipantInfoName>이상호</ParticipantInfoName>
              <SvgDiv>
                <InfoSvg
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
                </InfoSvg>
                <InfoSvg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24 16c0 21.2-5.1 41.1-14.2 58.7L416 300.8V256H358.9l-34.5-27c2.9-3.1 7-5 11.6-5h80V192H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zm362.5 407l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4c20.4-2.8 39.7-9.1 57.3-18.2z" />
                </InfoSvg>
              </SvgDiv>
            </ParticipantInfoDiv>
            <ParticipantInfoDiv>
              <ParticipantInfoImg src={female} />
              <ParticipantInfoName>김경희</ParticipantInfoName>
              <SvgDiv>
                <InfoSvg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#006aff"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
                  />
                </InfoSvg>
                <InfoSvg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24 16c0 21.2-5.1 41.1-14.2 58.7L416 300.8V256H358.9l-34.5-27c2.9-3.1 7-5 11.6-5h80V192H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H336c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zm362.5 407l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4c20.4-2.8 39.7-9.1 57.3-18.2z" />
                </InfoSvg>
              </SvgDiv>
            </ParticipantInfoDiv>
          </RightUpperDiv>
          <RightLowerDiv>
            <ChatTitleDiv>
              <ParticipantInfoName>채팅</ParticipantInfoName>
            </ChatTitleDiv>
            <ChatDiv>
              <Chatting message={message} />
            </ChatDiv>
            <ChatInputDiv>
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
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </Svg>
              <StyledInput placeholder="메시지를 입력해주세요.."></StyledInput>
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
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </Svg>
            </ChatInputDiv>
          </RightLowerDiv>
        </RightDiv>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  margin: 0 6rem 0 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const UpperDiv = styled.div`
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  border: solid 1px #cbcbcb;
  align-items: center;
`;

const LowerDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 38rem;
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
  align-items: center;
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
  padding: 1rem 2rem;
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
  height: 13.3rem;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
`;

const RightLowerDiv = styled.div`
  height: 26rem;
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

const ParticipantInfoDiv = styled.div`
  background-color: white;
  height: 4rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.1rem;
  gap: 1rem;
`;

const ParticipantInfoName = styled.div`
  width: 9.5rem;
  font-weight: 500;
`;

const ParticipantInfoImg = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 2rem;
  border: solid 1px gray;
`;

const InfoSvg = styled.svg`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #006aff;
  stroke: #006aff;
  fill: #006aff;
`;

const SvgDiv = styled.div`
  width: 5rem;
  display: flex;
  justify-content: space-between;
`;

const ChatTitleDiv = styled.div`
  background-color: white;
  padding: 1.3rem 2rem;
`;

const ChatInputDiv = styled.div`
  height: 5.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: white;
  border: solid 1px #ececec;
`;

const ChatDiv = styled.div`
  height: 15.3rem;
  overflow-y: scroll;
`;

const StyledInput = styled.input`
  width: 23rem;
  height: 2rem;
  padding: 0 0.7rem;
  background-color: transparent;
  border: transparent;

  &:focus {
    /* box-shadow: 0 0 10px #9ec4f2; */
    outline: none;
    background-color: white;
  }
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  /* border: solid green; */
`;

const SpanDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 2rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

const GreenBtn = styled.button`
  width: 16rem;
  height: 2.8rem;
  border-radius: 0.4rem;
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

const RedBtn = styled.button`
  width: 16rem;
  height: 2.8rem;
  border-radius: 0.4rem;
  background-color: #f54040;
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

const SvgButton = styled.button`
  margin: 0 0.8rem;
  height: 4rem;
  cursor: pointer;
  border: solid 1px #d2d2d2;
  border-radius: 0.4rem;
`;

const ModalSelect = styled.select`
  height: 2.5rem;
  width: 22rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  padding-left: 0.5rem;
`;

const ModalTextarea = styled.textarea`
  height: 10rem;
  border-radius: 0.4rem;
  padding: 0.5rem;
  font-size: 1rem;
`;
