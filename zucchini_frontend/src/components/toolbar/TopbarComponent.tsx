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

  function toggleChat() {
    props.toggleChat();
  }

  function toggleBuyModal() {
    setIsBuyModalOpen(!isBuyModalOpen);
  }

  function toggleReportModal() {
    setIsReportModalOpen(!isReportModalOpen);
  }

  const navigate = useNavigate();
  function leaveSession() {
    // await props.leaveSession();
    navigate("/scheduleList", { replace: true });
  }

  function buyItem() {
    props.buyItem();
    toggleBuyModal();
    // navigate("/scheduleList", { replace: true });
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
            {/* 구매하기 버튼은 구매자에게만 보이게... 가능할까 */}
            <button
              className="headerGButton"
              onClick={() => setIsBuyModalOpen(true)}
            >
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
          {/* 
          구매자가 구매하기 버튼을 누르면.. 
          거래 확정 모달은 판매자에게만 팝업,
          구매자의 닉네임이 모달에 출력되어야 함
          */}
          <Modal isOpen={isBuyModalOpen} toggle={toggleBuyModal}>
            <div className="modalDiv" onClick={toggleBuyModal}>
              <ClosedButton />
            </div>
            <div className="modalSpan">거래 확정하기</div>
            <div className="spanDiv">
              <span>님께서 거래 희망 버튼을 눌렀습니다.</span>
              <span>님과 거래를 확정 하시겠습니까?</span>
              <span>확정을 누르시면 영상종료 후 채팅방으로 이동합니다.</span>
            </div>
            <div className="buttonsDiv">
              <button className="greenBtn" onClick={buyItem}>
                확정
              </button>
              <button className="redBtn" onClick={toggleBuyModal}>
                거절
              </button>
            </div>
          </Modal>
          <Modal isOpen={isReportModalOpen} toggle={toggleReportModal}>
            {/* <div className="modalDiv" onClick={toggleReportModal}>
              <ClosedButton />
            </div>
            <div className="modalSpan">사용자 신고</div>
            <div className="spanDiv">
              <select className="modalSelect">
                <option>-- 신고하는 이유를 선택해주세요 --</option>
                <option>비매너 사용자</option>
                <option>욕설 신고</option>
                <option>성희롱 신고</option>
                <option>거래 / 환불 분쟁 신고</option>
                <option>사기 신고</option>
                <option>기타</option>
              </select>
              <textarea
                className="modalTextarea"
                placeholder="상세 사유를 입력해주세요.."
              ></textarea>
            </div>
            <div className="buttonsDiv">
              <button className="redBtn">신고</button>
              <button className="greenBtn" onClick={toggleReportModal}>
                취소
              </button>
            </div> */}
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
`;

const SubSpan = styled.span`
  color: gray;
  margin-bottom: 1rem;
  margin-left: 0.3rem;
`;
