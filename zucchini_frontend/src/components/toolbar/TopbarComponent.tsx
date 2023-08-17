import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Tooltip from "@material-ui/core/Tooltip";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

import IconButton from "@material-ui/core/IconButton";

import Modal from "../Common/Modal";
import ClosedButton from "../Button/ClosedButton";
import styled from "styled-components";
import Report from "../Common/Report";
import api from "../../utils/api";

interface IProps {
  title: string;
  other: string;
  itemNo: number;
  showNotification: boolean;
  leaveSession: Function;
  buyItem: Function;
  toggleChat: Function;
}

export default function ToolbarComponent(props: IProps) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isOkModalOpen, setIsOkModalOpen] = useState(false);
  const [isNoModalOpen, setIsNoModalOpen] = useState(false);

  function toggleChat() {
    props.toggleChat();
  }

  function toggleBuyModal() {
    setIsBuyModalOpen(!isBuyModalOpen);
  }

  function toggleReportModal() {
    setIsReportModalOpen(!isReportModalOpen);
  }

  function toggleOkModal() {
    setIsOkModalOpen(!isOkModalOpen);
  }

  function toggleNoModal() {
    setIsNoModalOpen(!isNoModalOpen);
  }

  const navigate = useNavigate();
  async function leaveSession() {
    // await props.leaveSession();
    navigate("/scheduleList", { replace: true });
  }

  async function buyItem() {
    const conferNo = window.location.pathname.split("/conference/")[1];
    setIsOkModalOpen(!isOkModalOpen);

    const userinfo = localStorage.getItem("USER_INFO");
    if (userinfo === null) return;
    const parsedinfo = JSON.parse(userinfo);
    const response = await api.post(`/sse/count/${conferNo}`, {
      userName: parsedinfo.nickname,
      buy: true,
    });

    setIsBuyModalOpen(!isBuyModalOpen);

    // 원래 밑에 2줄 주석 아니었는데 에러나서 일시적으로 주석처리함
    // props.buyItem();
    // toggleBuyModal();

    // navigate("/scheduleList", { replace: true });

    // 3초 후 자동으로 페이지 이동시키기..
    // setTimeout(() = {
    //   // 페이지 이동 로직 여기에 작성...
    // }, 3000);
  }

  async function dontbuyItem() {
    // 거래 거절되었다는 내용의 모달 팝업시키기
    const conferNo = window.location.pathname.split("/conference/")[1];
    setIsNoModalOpen(!isNoModalOpen);

    const userinfo = localStorage.getItem("USER_INFO");
    if (userinfo === null) return;
    const parsedinfo = JSON.parse(userinfo);
    const response = await api.post(`/sse/count/${conferNo}`, {
      userName: parsedinfo.nickname,
      buy: false,
    });

    setIsBuyModalOpen(!isBuyModalOpen);
  }

  async function requestDeal() {
    const conferNo = window.location.pathname.split("/conference/")[1];
    const userinfo = localStorage.getItem("USER_INFO");
    if (userinfo === null) return;
    const parsedinfo = JSON.parse(userinfo);
    const response = await api.post(`/sse/count/${conferNo}`, {
      userName: parsedinfo.nickname,
      buy: null,
    });
  }

  // 신고사유
  const reportReasons = [
    "판매금지물품",
    "허위 매물",
    "전문판매업자",
    "도배",
    "욕설, 비방",
    "성희롱",
  ];

  function goBuy() {
    setIsBuyModalOpen(true);
  }

  return (
    <AppBar className="toolbar" id="header">
      <Toolbar className="toolbar">
        <div id="titleHeader">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            id="titleSvg"
          >
            <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
          </svg>
          <p id="videoTitle">{props.title}</p>
          <div className="buttonDiv">
            <button className="headerGButton" onClick={() => requestDeal()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-6 h-6"
                id="checkSvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              거래하기
            </button>
            <button className="headerRButton" onClick={leaveSession}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-6 h-6"
                id="checkSvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              종료하기
            </button>
            <button className="headerRButton" onClick={toggleReportModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="w-6 h-6"
                id="checkSvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              신고하기
            </button>
          </div>
          <Modal isOpen={isBuyModalOpen} toggle={toggleBuyModal}>
            <div className="modalDiv" onClick={toggleBuyModal}>
              <ClosedButton />
            </div>
            <div className="modalSpan">거래 확정하기</div>
            <div className="pDiv">
              <p>님께서 거래 희망 버튼을 눌렀습니다.</p>
              <p>님과 거래를 확정 하시겠습니까?</p>
              <p>확정을 누르시면 영상종료 후 채팅방으로 이동합니다.</p>
            </div>
            <div className="buttonsDiv">
              <button className="greenBtn" onClick={buyItem}>
                확정
              </button>
              <button className="redBtn" onClick={dontbuyItem}>
                거절
              </button>
            </div>
          </Modal>
          <Modal isOpen={isReportModalOpen} toggle={toggleReportModal}>
            <ModalDiv>
              <ClosedButton onClick={toggleReportModal} />
            </ModalDiv>
            <ModalSpan>신고하기</ModalSpan>
            <SubSpan>신고 사유를 선택해주세요.</SubSpan>
            <Report
              reportedNickname={props.other}
              itemNo={props.itemNo}
              reasons={reportReasons}
              roomNo={null}
              onCancel={toggleReportModal}
            />
          </Modal>
          <Modal isOpen={isOkModalOpen} toggle={toggleOkModal}>
            <ModalDiv>
              <ClosedButton onClick={toggleOkModal} />
            </ModalDiv>
            <ModalSpan style={{ marginBottom: "1rem" }}>거래 확정!</ModalSpan>
            <div className="pDiv">
              <p>거래 확정이 완료되었습니다.</p>
              <p>3초 후 자동으로 영상 통화 종료 후 채팅방으로 이동합니다.</p>
            </div>
            <div className="buttonsDiv">
              <button className="greenBtn">채팅방으로 이동</button>
            </div>
          </Modal>
          <Modal isOpen={isNoModalOpen} toggle={toggleNoModal}>
            <ModalDiv>
              <ClosedButton onClick={toggleNoModal} />
            </ModalDiv>
            <ModalSpan style={{ marginBottom: "1rem" }}>거래 미확정</ModalSpan>
            <div className="pDiv">
              <p>판매자가 거래를 거절하였습니다..</p>
              <p>영상 통화를 계속 진행하시겠습니까?</p>
              <p>
                나가기 버튼을 누르시면 통화 종료 후 메인페이지로 이동합니다.
              </p>
            </div>
            <div className="buttonsDiv">
              <button className="greenBtn">통화 진행</button>
              <button className="redBtn">나가기</button>
            </div>
          </Modal>
        </div>

        <div className="chatContainer">
          <IconButton color="inherit" onClick={toggleChat} id="navChatButton">
            {props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
  color: black;
`;

const SubSpan = styled.span`
  color: gray;
  margin-bottom: 1rem;
  margin-left: 0.3rem;
`;
