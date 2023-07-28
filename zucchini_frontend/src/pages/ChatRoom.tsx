import SimpleCalendar from "../components/Schedule/SimpleCalendar";
import styled from "styled-components";
import female from "../assets/images/female.jpg";
import Modal from "../components/Common/Modal";
import { useState } from "react";
import Chatting from "../components/Chatting";
import ClosedButton from "../components/Button/ClosedButton";
import { Link } from "react-router-dom";

export default function ChatRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [buyOpen, setBuyOpen] = useState(false);

  const buyToggle = () => {
    setBuyOpen(!buyOpen);
  };

  return (
    <ContainerDiv>
      <Modal isOpen={buyOpen} toggle={buyToggle}>
        <ModalDiv>
          <ClosedButton />
        </ModalDiv>
        <ModalSpan>구매 확정하기</ModalSpan>
        <SpanDiv>
          <span>구매하신 물건에 이상이 없는지 확인하셨나요?</span>
          <span>구매 확정을 누르시면 영상 다시보기가 불가합니다.</span>
          <span>중고 매물을 꼼꼼하게 확인 후 확정을 눌러주세요.</span>
        </SpanDiv>
        <ButtonDiv>
          <GreenBtn>
            <Link to={"/mypage/buy"}>확정</Link>
          </GreenBtn>
        </ButtonDiv>
      </Modal>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <StyledSvg
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
              d="M6 18L18 6M6 6l12 12"
            />
          </StyledSvg>
        </ModalDiv>
        <ModalSpan>화상통화 일정 선택</ModalSpan>
        <ModalSubSpan>
          <SubSpan>일정은 하루만 선택 가능합니다</SubSpan>
        </ModalSubSpan>
        <SimpleCalendar />
        <ModalBtn>확인</ModalBtn>
        <ModalBtn>취소</ModalBtn>
      </Modal>
      <BodyDiv>
        <LeftDiv>
          <UpperDiv>
            <TitleSpan>판매자가 선택한 일정</TitleSpan>
            <SimpleCalendar />
            <StyledBtnDiv>
              <StyledBtn>
                <Link to={"/conference"} target={"_blank"}>
                  영상 통화하기
                </Link>
              </StyledBtn>
              <StyledBtn onClick={toggle}>일정 선택하기</StyledBtn>
            </StyledBtnDiv>
          </UpperDiv>
          <LowerDiv>
            <SellerTitle>판매자 정보</SellerTitle>
            <SellerDiv>
              <SellerImg src={female}></SellerImg>
              <SellerSpanDiv>
                <SellerName>백조이김</SellerName>
                <span>Lv.1 애호박씨앗</span>
                <SubSpan>판매중 3 · 거래완료 2</SubSpan>
              </SellerSpanDiv>
              <SellerBtn onClick={buyToggle}>구매확정</SellerBtn>
            </SellerDiv>
          </LowerDiv>
        </LeftDiv>
        <RightDiv>
          <ChatTitleDiv>
            <ChatImg src={female}></ChatImg>
            <ChatDiv>
              <SellerName>갤럭시북2 프로 360 32GB, 1TB 최고 사양</SellerName>
              <SubSpan>백조이김</SubSpan>
            </ChatDiv>
            <SvgDiv>
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </Svg>
            </SvgDiv>
          </ChatTitleDiv>
          <ChatMainDiv>
            <Chatting />
          </ChatMainDiv>
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
        </RightDiv>
      </BodyDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: #849c80;
`;

const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem;
`;

const LeftDiv = styled.div``;

const RightDiv = styled.div`
  width: 40rem;
  padding-left: 2rem;
`;

const UpperDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const LowerDiv = styled.div`
  padding-top: 2rem;
`;

const TitleSpan = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
`;

const StyledBtnDiv = styled.div`
  display: flex;
  width: 19rem;
  flex-direction: column;
  margin-top: 1.3rem;
  gap: 0.5rem;
`;

const StyledBtn = styled.button`
  height: 2.7rem;
  background-color: #cde990;
  border: solid 2px #cde990;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-right: 0.4rem;
  font-size: 1rem;

  &:hover {
    background-color: white;
  }
`;

const ModalBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #cde990;
  border: solid 1px #cde990;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-right: 0.4rem;
  margin-top: 2rem;

  &:hover {
    background-color: white;
  }
`;
const SellerDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SellerImg = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 5rem;
  border: solid 1px black;
  margin-top: 1rem;
`;

const SellerSpanDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  gap: 0.8rem;
  padding-top: 0.8rem;
`;

const SellerTitle = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
`;

const SellerName = styled.span`
  font-weight: 700;
`;

const SubSpan = styled.span`
  color: gray;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ModalSubSpan = styled.div`
  margin-bottom: 1rem;
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
`;

const ChatTitleDiv = styled.div`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #f3f3f3;
`;

const ChatMainDiv = styled.div`
  height: 32rem;
  background-color: #cccccc;
`;

const ChatInputDiv = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.7rem;
  background-color: #f3f3f3;
`;

const SvgDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 3.5rem;
`;

const Svg = styled.svg`
  width: 24px;
  height: 24px;
  color: #006aff;
`;

const ChatImg = styled.img`
  height: 3rem;
  width: 3rem;
  border: solid 1px black;
  border-radius: 4rem;
`;

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  gap: 0.2rem;
`;

const StyledInput = styled.input`
  width: 23rem;
  height: 2rem;
  padding: 0 0.7rem;
  background-color: transparent;
  border: transparent;
  border-radius: 0.4rem;
  font-size: 1rem;

  &:focus {
    /* box-shadow: 0 0 10px #9ec4f2; */
    outline: none;
    background-color: white;
  }
`;

const SellerBtn = styled.button`
  height: 3rem;
  width: 5.6rem;
  border-radius: 0.4rem;
  border: solid 2px #ffd4d4;
  background-color: #ffd4d4;
  letter-spacing: 0.1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const SpanDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.1rem 0 2rem 0;
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
  background-color: #cde990;
  border: solid 2px #cde990;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: solid 2px #cde990;
    color: #cde990;
  }
`;
