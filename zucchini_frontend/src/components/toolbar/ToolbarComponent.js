import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Tooltip from "@material-ui/core/Tooltip";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

import IconButton from "@material-ui/core/IconButton";

import Modal from "../Common/Modal";
import ClosedButton from "../Button/ClosedButton";

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false, isReportModalOpen: false };
    this.toggleReportModal = this.toggleReportModal.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleChat() {
    this.props.toggleChat();
  }

  toggleReportModal() {
    this.setState((prevState) => ({
      isReportModalOpen: !prevState.isReportModalOpen,
    }));
  }

  render() {
    const localUser = this.props.user;
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
            {/* 여기에....영상 통화 title 넣으면 됩니다! ! */}
            <p id="videoTitle">국밥 팔아요....</p>
            <div class="buttonDiv">
              <button class="headerGButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                  id="checkSvg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                구매하기
              </button>
              <button class="headerRButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
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
              <button class="headerRButton" onClick={this.toggleReportModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
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
            <Modal
              isOpen={this.state.isReportModalOpen}
              toggle={this.toggleReportModal}
            >
              <div class="modalDiv">
                <ClosedButton />
              </div>
              <div class="modalSpan">사용자 신고</div>
              <div class="spanDiv">
                <select class="modalSelect">
                  <option>-- 신고하는 이유를 선택해주세요 --</option>
                  <option>비매너 사용자</option>
                  <option>욕설 신고</option>
                  <option>성희롱 신고</option>
                  <option>거래 / 환불 분쟁 신고</option>
                  <option>사기 신고</option>
                  <option>기타</option>
                </select>
                <textarea
                  class="modalTextarea"
                  placeholder="상세 사유를 입력해주세요.."
                ></textarea>
              </div>
              <div class="buttonsDiv">
                <button class="redBtn">신고</button>
                <button class="greenBtn">취소</button>
              </div>
            </Modal>
          </div>

          <div className="chatContainer">
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
