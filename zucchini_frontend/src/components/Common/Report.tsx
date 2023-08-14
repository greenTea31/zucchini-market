import styled from "styled-components";
import api from "../../utils/api";
import { useEffect, useState } from "react";

// 신고당하는사람, 아이템넘버, 신고사유리스트(아이템상세페이지/채팅 상황따라 다름), roomNo(null가능)
export default function Report({
  reportedNickname,
  itemNo,
  reasons,
  roomNo,
  onCancel,
}: any) {
  // 신고 옵션
  const [reportCategory, setReportCategory] = useState("");
  // 상세 사유
  const [reportReason, setReportReason] = useState("");

  // 신고 모달 취소버튼
  const [isVisible, setIsVisible] = useState(true);

  const handleCancel = () => {
    setIsVisible(false);
    onCancel();
  };

  const realReason = () => {
    return reportCategory + " : " + reportReason;
  };

  const handleReport = async () => {
    // 신고 데이터 전송\
    try {
      await api({
        method: "post",
        url: "report",
        data: {
          reported: reportedNickname,
          reason: realReason(),
          itemNo: itemNo,
          roomNo: roomNo,
        },
      }).then((response: any) => console.log("신고 성공: " + response.data));
    } catch (error) {
      console.error("신고실패" + error);
    }
  };
  return (
    <ReportDiv>
      <SpanDiv>
        <ModalSelect onChange={(e) => setReportCategory(e.currentTarget.value)}>
          <option>-- 신고 사유를 선택해주세요 --</option>
          {reasons.map((reason: any) => {
            return <option>{reason}</option>;
          })}
        </ModalSelect>
        <ModalTextarea
          placeholder="상세 사유를 입력해주세요.."
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        ></ModalTextarea>
      </SpanDiv>
      <ButtonDiv>
        <RedBtn onClick={handleReport}>신고</RedBtn>
        <GreenBtn onClick={handleCancel}>취소</GreenBtn>
      </ButtonDiv>
    </ReportDiv>
  );
}

const ReportDiv = styled.div`
  margin: 1rem;
`;

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
