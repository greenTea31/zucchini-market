import styled from "styled-components";

export default function Report() {
  return (
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
      <ModalTextarea
        placeholder="상세 사유를 입력해주세요.."
        // value={reportReason}
        // onChange={(e) => setReportReason(e.target.value)}
      ></ModalTextarea>
    </SpanDiv>
  );
}
const SpanDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 2rem;
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
