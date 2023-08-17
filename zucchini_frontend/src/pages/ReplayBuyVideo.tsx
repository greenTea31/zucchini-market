import styled from "styled-components";
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
  const [videoNo, setVideoNo] = useState<number>();
  const [seller, setSeller] = useState("");
  const [itemNo, setItemNo] = useState();

  const location = useLocation();
  const getVideo = async () => {
    try {
      const response = await api.get(
        `video/${location.pathname.split("/")[4]}`
      );
      console.log(response);
      setVideo(response.data.link);
      setTitle(response.data.itemTitle);
      setVideoNo(response.data.no);
      setSeller(response.data.seller);
      setItemNo(response.data.itemNo);
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
  const [isError, setIsError] = useState(false); // 확정일 연장 에러
  const [errorMsgEx, setErrorMsgEx] = useState("");
  const [isError2, setIsError2] = useState(false); // 구매 확정 에러
  const [errorMsgCon, setErrorMsgCon] = useState("");
  const [starRating, setStarRating] = useState(0); // 선택한 별점 개수
  const [isStar, setIsStar] = useState(false);

  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };
  const toggleExtend = () => {
    setIsExtended(!setIsExtended);
  };

  const errorToggle = () => {
    setIsError(!isError);
  };
  const errorToggle2 = () => {
    setIsError2(!isError2);
  };

  const confirmDeal = async () => {
    try {
      await api
        .put(`item/${location.pathname.split("/")[4]}/confirmation`)
        .then((response) => toggleConfirm());
    } catch (error: any) {
      console.log(error.response.data);
      setErrorMsgCon(`${error.response.data}`);
      toggle();
      errorToggle2();
    }
  };

  // 별점 모달 열고 닫기
  const toggleStar = () => {
    setIsStar(!isStar);
    // 모달 닫히면 별점 초기화
    setStarRating(0);
  };

  // 별을 눌렀을 때 별의 개수를 StarRating에 저장
  const handleStarClick = (grade: number) => {
    setStarRating(grade);
  };

  // 별점 통신
  const confirmRating = async () => {
    toggle();
    // 선택한 별이 없을 경우 예외 처리
    if (starRating === 0) {
      setErrorMsgCon("별점을 선택해주세요.");
      return;
    }

    try {
      // 닉네임, 아이템 번호, 점수 넘겨주기
      await api.post("grade", {
        gradeRecipient: seller,
        itemNo: itemNo,
        grade: starRating,
      });
      setIsStar(false);
      setIsConfirm(true);
      await confirmDeal();
    } catch (error: any) {
      console.log(error.response.data);
      setErrorMsgCon(`${error.response.data}`);
      setIsStar(false);
      errorToggle2();
    }
  };

  const extendDue = async () => {
    try {
      await api.put(`video/extension/${videoNo}`).then((response) => {
        setDueDate(dayjs(new Date(response.data))?.format("YYYY년 MM월 DD일"));
        toggleExtend();
      });
    } catch (error: any) {
      console.log(error.response.data);
      setErrorMsgEx(`${error.response.data}`);
      toggle2();
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
        <ModalSpan>{errorMsgEx}</ModalSpan>
        <ButtonDiv>
          <GreenBtn onClick={errorToggle}>확인</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 구매 확정 에러 모달 */}
      <Modal isOpen={isError2} toggle={errorToggle2}>
        <ModalDiv>
          <ClosedButton onClick={errorToggle2} />
        </ModalDiv>
        <ModalSpan>{errorMsgCon}</ModalSpan>
        <ButtonDiv>
          <GreenBtn onClick={errorToggle2}>확인</GreenBtn>
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
          <GreenBtn onClick={toggleExtend}>확인</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 구매 확정 시 모달 */}
      <Modal isOpen={isConfirm} toggle={toggleConfirm}>
        <ModalDiv>
          <ClosedButton onClick={toggleConfirm} />
        </ModalDiv>
        <ModalSpan>구매가 확정되었습니다!</ModalSpan>
        <ButtonDiv>
          <GreenBtn onClick={toggleConfirm}>확인</GreenBtn>
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
          <ClosedButton onClick={toggle} />
        </ModalDiv>
        <ModalSpan>구매 확정하기</ModalSpan>
        <SpanDiv>
          <span>구매하신 물건에 이상이 없는지 확인하셨나요?</span>
          <span>구매 확정을 누르시면 영상 다시보기가 불가합니다.</span>
          <span>중고 매물을 꼼꼼하게 확인 후 확정을 눌러주세요.</span>
        </SpanDiv>
        <ButtonDiv>
          <GreenBtn onClick={toggleStar}>확정</GreenBtn>
        </ButtonDiv>
      </Modal>
      {/* 별점 선택 모달 */}
      <Modal isOpen={isStar} toggle={toggleStar}>
        <ModalDiv>
          <ClosedButton onClick={toggleStar} />
        </ModalDiv>
        <ModalSpan>별점을 선택해주세요</ModalSpan>
        <SpanDiv>
          <span>해당 거래는 만족스러우셨나요?</span>
          <span>거래에 대한 별점을 주세요!</span>
          <span>별의 개수로 1점 ~ 5점의 마음을 표현해주세요</span>
        </SpanDiv>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((index) => (
            <StarDiv
              key={index}
              className={`star ${index <= starRating ? "selected" : ""}`}
              onClick={() => handleStarClick(index)}
            >
              <StarSvg
                xmlns="http://www.w3.org/2000/svg"
                fill={index <= starRating ? "yellow" : "none"}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </StarSvg>
            </StarDiv>
          ))}
        </StarContainer>
        <ButtonDiv>
          <GreenBtn onClick={confirmRating}>확인</GreenBtn>
        </ButtonDiv>
      </Modal>
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
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

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const StarDiv = styled.div`
  width: 3rem;
  height: 3rem;
`;

const StarSvg = styled.svg`
  cursor: pointer;
`;
