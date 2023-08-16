import styled from "styled-components";
import GoBackButton from "../components/Button/GoBackButton";
import Modal from "../components/Common/Modal";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ClosedButton from "../components/Button/ClosedButton";
import { motion } from "framer-motion";
import api from "../utils/api";
import ReactPlayer from "react-player";
import { async } from "q";
import dayjs from "dayjs";

export default function ReplayBuyVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState();
  const [title, setTitle] = useState("");
  const [videoNo, setVideoNo] = useState();
  const location = useLocation();
  const getVideo = async () => {
    try {
      const response = await api.get(
        `video/${location.pathname.split("/")[4]}`
      );
      setVideo(response.data.link);
      setTitle(response.data.itemTitle);
      setVideoNo(response.data.no);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  const toggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  // 구매확정 or 확정일 연장
  const [isConfirm, setIsConfirm] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };
  const toggleExtend = () => {
    setIsExtended(!setIsExtended);
  };

  const errorToggle = () => {
    setIsError(!isError);
  };

  const confirmDeal = async () => {
    try {
      await api
        .put(`item/${location.pathname.split("/")[4]}/confirmation`)
        .then((response) => toggleConfirm());
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const extendDue = async () => {
    try {
      await api.put(`video/extension /${videoNo}`).then((response) => {
        setDueDate(dayjs(new Date(response.data))?.format("YYYY년 MM월 DD일"));
        toggleExtend();
      });
    } catch (error: any) {
      setErrorMsg(`${error.response.data}`);
      errorToggle();
    }
  };

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 구매 확정일 연장 재시도 시 에러 모달 */}
      <Modal isOpen={isError} toggle={errorToggle}>
        <ModalDiv>
          <ClosedButton onClick={errorToggle} />
        </ModalDiv>
        <ModalSpan>{errorMsg}</ModalSpan>
        <ButtonDiv>
          <GreenBtn onClick={toggle2}>확인</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 구매 확정일 연장 시 모달 */}
      <Modal isOpen={isExtended} toggle={toggleExtend}>
        <ModalDiv>
          <ClosedButton onClick={toggleExtend} />
        </ModalDiv>
        <ModalSpan>구매 확정일을 일주일 연장했습니다.</ModalSpan>
        <SpanDiv>
          <span>최종 구매 확정 마감일 : {dueDate}</span>
        </SpanDiv>
        <ButtonDiv>
          <GreenBtn onClick={toggle2}>확인</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 구매 확정 시 모달 */}
      <Modal isOpen={isConfirm} toggle={toggleConfirm}>
        <ModalDiv>
          <ClosedButton onClick={toggleConfirm} />
        </ModalDiv>
        <ModalSpan>구매가 확정되었습니다!</ModalSpan>
        <ButtonDiv>
          <GreenBtn onClick={toggle}>확인</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 구매 확정 연장 모달 */}
      <Modal isOpen={isOpen2} toggle={toggle2}>
        <ModalDiv>
          <ClosedButton onClick={toggle2} />
        </ModalDiv>
        <ModalSpan>구매 확정일 연장</ModalSpan>
        <SpanDiv>
          <span>구매 확정일 연장은 1회(7일)까지만 가능합니다.</span>
          <span>거래일자 기준 14일 후 자동으로 구매 확정 처리됩니다.</span>
        </SpanDiv>
        <ButtonDiv>
          <GreenBtn onClick={extendDue}>구매 연장</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 구매 확정 모달 */}
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
          <GreenBtn onClick={confirmDeal}>확정</GreenBtn>
        </ButtonDiv>
      </Modal>
      <GoBackButton />
      <div>
        <TitleSpan>
          {/* 타이틀 나중에 상품 정보로 바꿔줘야 함!!! */}
          {title}
        </TitleSpan>
        <VideoScreenDiv>
          <ReactPlayer
            url={video}
            controls // 재생 컨트롤 표시
            width="100%"
            height="100%"
          />
        </VideoScreenDiv>
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
