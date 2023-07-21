import styled from "styled-components";
import female from "../assets/images/female.jpg";
import itemEx from "../assets/images/itemEx.png";
import { Button } from "../components/Common/Button";

// 전체

const Body = styled.div`
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  width: 100%;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 4fr 1fr;
  gap: 10px;
  margin: 10% 20%;
  width: 100%; /* 바디 컨테이너의 너비 (원하는 크기로 변경 가능) */
  /* max-width: 1600px; 바디 컨테이너의 최대 너비 (원하는 크기로 변경 가능) */
  padding: 20px;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

// 제품 사진 담을 컴포넌트
const StyledImgDiv = styled.div`
  width: 100%; /* 컨테이너의 가로 크기를 100%로 설정 */
  /* max-width: 700px; */
  position: relative;
  overflow: hidden;
`;
const StyledItemImg = styled.img`
  width: 100%; /* 이미지의 가로 크기를 100%로 설정하여 컨테이너에 꽉 차도록 함 */
  height: auto; /* 높이를 자동으로 조정하여 비율을 유지 */
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
  font-weight: 600;
`;

//제품 설명
const StyledAccount = styled.div`
  flex-grow: 8;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
`;

// 가격, 업로드 정보, 신고버튼 정렬
const StyledGridItem = styled.div`
  flex-grow: 2;
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

//제품 가격
const StyledPrice = styled.p`
  text-align: start;
`;

// 업로드 정보 (시간, 조회수, 찜 수)
const StyledUploadInfo = styled.p`
  text-align: start;
`;

// 신고 버튼
const StyledReportButton = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  margin: 1rem 0.3rem;
`;
const Buttons = styled.div`
  flex-grow: 2;

  display: flex;
  flex-direction: column;
`;

// 주의사항
const StyledWarningDiv = styled.div`
  display: flex;
  flex-direction: column;
  place-self: center center;
  align-self: stretch;
  padding: 3rem;
  background-color: lightgray;
`;

// 주의사항 제목
const StyledWarningTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 0.7rem;
`;

// 주의사항 내용
const StyledWarningContent = styled.p`
  align-self: center;
  justify-self: center;
  font-size: 1rem;
`;

// 판매자 정보 컴포넌트
const StyledSellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;

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
  font-weight: 500;
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
  border: 5px solid;
  border-radius: 50%;
  grid-column: 1/ 2;
  grid-row: 1 / 3;
  width: 100%;
  height: auto;
`;

// 판매자 닉네임
const StyleSellerNickname = styled.p`
  text-align: center;
`;

// 판매자 grade
const StyleSellerGrade = styled.p`
  text-align: center;
`;

// 판매자 거래횟수
const StyleSellerCommit = styled.p`
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  text-align: center;
`;

export default function Detail() {
  return (
    <Body>
      <GridContainer>
        <StyledImgDiv>
          <StyledItemImg src={itemEx} />
        </StyledImgDiv>
        <StyledInfo>
          <StyledItemTitle>판매글 제목</StyledItemTitle>
          <StyledAccount>
            판매글 내용 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명 설명 설명 설명 설명
          </StyledAccount>
          <StyledGridItem>
            <StyledPrice>$10,000</StyledPrice>
            <StyledReportButton>신고</StyledReportButton>
            <StyledUploadInfo>업로드시간, 조회수, 찜 수</StyledUploadInfo>
          </StyledGridItem>
          <Buttons>
            <Button Size="medium">채팅하기</Button>
            <Button Size="medium">스케줄 잡기</Button>
          </Buttons>
        </StyledInfo>
        <StyledWarningDiv>
          <StyledWarningTitle>거래 전 주의사항</StyledWarningTitle>
          <StyledWarningContent>
            판매자가 별도의 메신저로 결제링크를 보내거나
            직거래/직접송금을유도하는 경우 사기일 가능성이 높으니 거래를 자제해
            주시고 신고하기 버튼을 눌러 신고해주시기 바랍니다.
          </StyledWarningContent>
        </StyledWarningDiv>
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
    </Body>
  );
}
