import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Common/Modal";
import { useState } from "react";
import ClosedButton from "../Button/ClosedButton";
import FullWidthButton from "../Button/FullWidthButton";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ContainerDiv>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalDiv>
            <ClosedButton />
          </ModalDiv>
          <ModalSpan>문의하기</ModalSpan>
          <SpanDiv>
            <ModalSelect>
              <option>-- 문의 카테고리를 선택해주세요 --</option>
              <option>일반문의</option>
              <option>개선 / 제안</option>
              <option>회원정보</option>
              <option>탈퇴문의</option>
              <option>매물목록</option>
              <option>신고 / 이용제한</option>
              <option>기타</option>
            </ModalSelect>
            <ModalTextarea placeholder="상세 내용을 입력해주세요.."></ModalTextarea>
          </SpanDiv>
          <ButtonDiv>
            <FullWidthButton>문의</FullWidthButton>
            <FullWidthButton onClick={goBack}>취소</FullWidthButton>
          </ButtonDiv>
        </Modal>
        <FooterDiv>
          <Link to={"/termsofuse"} target={"_blank"}>
            <StyledSpan>이용약관</StyledSpan>
          </Link>
          <Link to={"/privacypolicy"} target={"_blank"}>
            <StyledSpan>개인정보처리방침</StyledSpan>
          </Link>
          <StyledSpan onClick={toggle}>문의하기</StyledSpan>
        </FooterDiv>
        <LogoSpan>ⓒ 애호박마켓</LogoSpan>
      </ContainerDiv>
    </>
  );
}

const ContainerDiv = styled.div`
  padding: 1rem 9rem;
  margin-top: 4rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px lightgray;
`;

const FooterDiv = styled.span`
  display: flex;
  justify-content: space-between;
  width: 20rem;
`;

const StyledSpan = styled.span`
  color: gray;
  cursor: pointer;
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
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
  justify-content: center;
  gap: 0.1rem;
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

const LogoSpan = styled.span`
  color: gray;
`;
