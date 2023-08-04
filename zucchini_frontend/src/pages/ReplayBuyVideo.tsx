import styled from "styled-components";
import GoBackButton from "../components/Button/GoBackButton";
import Modal from "../components/Common/Modal";
import { useState } from "react";
import ClosedButton from "../components/Button/ClosedButton";
import { motion } from "framer-motion";

export default function ReplayBuyVideo() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  const toggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal isOpen={isOpen2} toggle={toggle2}>
        <ModalDiv>
          <ClosedButton />
        </ModalDiv>
        <ModalSpan>구매 확정일 연장</ModalSpan>
        <SpanDiv>
          <span>구매 확정일 연장은 1회(7일)까지만 가능합니다.</span>
          <span>거래일자 기준 14일 후 자동으로 구매 확정 처리됩니다.</span>
        </SpanDiv>
        <ButtonDiv>
          <GreenBtn>구매 연장</GreenBtn>
        </ButtonDiv>
      </Modal>
      <Modal isOpen={isOpen} toggle={toggle}>
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
          <GreenBtn>확정</GreenBtn>
        </ButtonDiv>
      </Modal>
      <GoBackButton />
      <div>
        <TitleSpan>
          갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
        </TitleSpan>
        <VideoScreenDiv></VideoScreenDiv>
        <FixedButtonDiv>
          <StyledBtn onClick={toggle}>구매확정</StyledBtn>
          <StyledBtn onClick={toggle2}>확정연장</StyledBtn>
        </FixedButtonDiv>
      </div>
    </ContainerDiv>
  );
}

const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 15rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const VideoScreenDiv = styled.div`
  height: 40rem;
  margin: 1.5rem 0 0 0;
  background-color: black;
`;

const TitleSpan = styled.span`
  font-size: 2rem;
`;

const FixedButtonDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  top: 12rem;
  left: 85rem;
`;

const StyledBtn = styled.button`
  width: 8.5rem;
  height: 3.5rem;
  font-size: 1rem;
  border-radius: 0.4rem;
  background-color: #cde990;
  border: solid 2px #cde990;
  color: #254021;
  letter-spacing: 0.1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: solid 2px #cde990;
  }
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
