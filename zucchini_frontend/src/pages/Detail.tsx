import styled from "styled-components";
import female from "../assets/images/female.jpg";
import itemEx from "../assets/images/itemEx.png";

// 전체
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 1fr;
  grid-template-rows: 4fr 1fr;
  gap: 10px;
  margin: 10% 20%;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

// 제품 사진 컴포넌트
const StyledItemImg = styled.img`
  place-self: center center;
`;

// 제품 정보 컴포넌트
const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem;
`;
//판매글 제목
const StyledItemTitle = styled.h2`
  flex-grow: 1;
  font-size: 2.5rem;
  font-weight: 500;
`;

//제품 설명
const StyledAccount = styled.div`
  flex-grow: 8;

  display: flex;
  flex-wrap: wrap;
  font-size: small;
`;

// 가격, 업로드 정보, 신고버튼 정렬
const StyledGridItem = styled.div`
  flex-grow: 2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 2fr 1fr;
`;

//제품 가격
const StyledPrice = styled.p``;

// 업로드 정보 (시간, 조회수, 찜 수)
const StyledUploadInfo = styled.p``;

// 신고 버튼
const StyledReportButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`;
const Buttons = styled.div`
  flex-grow: 2;

  display: flex;
  flex-direction: column;
`;
const StyledChatButton = styled.button``;

const StyledScheduleButton = styled.button``;

// 주의사항 안내
const StyledWarning = styled.div`
  display: flex;
  place-self: center center;
`;

// 판매자 정보 컴포넌트
const StyledSellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  height: auto;

  place-self: center center;
`;

// "판매자정보"
const StyledTitleSmall = styled.p`
  flex-grow: 1;

  display: flex; //이게 맞나
  justify-self: start;
  text-align: left;
  margin-bottom: 1rem;

  font-size: 1.2rem;
  font-weight: 400;
`;

// 판매자 이미지, 이름, 레벨, 거래이력 정렬
const StyledGridSeller = styled.div`
  flex-grow: 3;

  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: 1fr 1fr;
`;
// 판매자 프로필사진
const StyledSellerImg = styled.img`
  grid-column: 1/ 2;
  grid-row: 1 / 3;
  background-size: 50%;
  background-position: center;
`;

// 판매자 닉네임
const StyleSellerNickname = styled.p``;

// 판매자 grade
const StyleSellerGrade = styled.p``;

// 판매자 거래횟수
const StyleSellerCommit = styled.p`
  grid-column: 2 / 4;
  grid-row: 2 / 3;
`;

export default function Detail() {
  return (
    <GridContainer>
      <StyledItemImg src={itemEx} />
      <StyledInfo>
        <StyledItemTitle>판매글 제목</StyledItemTitle>
        <StyledAccount>판매글 내용</StyledAccount>
        <StyledGridItem>
          <StyledPrice>가격</StyledPrice>
          <StyledReportButton>신고버튼</StyledReportButton>
          <StyledUploadInfo>업로드 정보</StyledUploadInfo>
        </StyledGridItem>
        <Buttons>
          <StyledChatButton>채팅하기</StyledChatButton>
          <StyledScheduleButton>스케줄 잡기</StyledScheduleButton>
        </Buttons>
      </StyledInfo>
      <StyledWarning>거래 전 주의사항!</StyledWarning>
      <StyledSellerInfo>
        <StyledTitleSmall>판매자정보</StyledTitleSmall>
        <StyledGridSeller>
          <StyledSellerImg src={female} />
          <StyleSellerNickname>닉네임</StyleSellerNickname>
          <StyleSellerGrade>등급</StyleSellerGrade>
          <StyleSellerCommit>거래이력</StyleSellerCommit>
        </StyledGridSeller>
      </StyledSellerInfo>
    </GridContainer>
  );
}
