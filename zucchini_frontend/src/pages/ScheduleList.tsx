import styled from "styled-components";
import ScheduleEach from "../components/Schedule/ScheduleEach";

export default function ScheduleList() {
  return (
    <ContainerDiv>
      <ChatListDiv>
        <TitleDiv>
          <TitleSpan>나의 일정</TitleSpan>
        </TitleDiv>
        <div>
          <TodayDiv>
            <p>Today : 2023-08-03</p>
          </TodayDiv>
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
          <ScheduleEach />
        </div>
      </ChatListDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const TitleSpan = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const ChatListDiv = styled.div`
  height: 40rem;
  width: 37rem;
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  overflow-y: auto;

  /* 스크롤바의 스타일 지정 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    background-color: #e8e2d9; /* 스크롤바의 배경색 */
  }

  /* 스크롤바의 thumb 스타일 지정 */
  &::-webkit-scrollbar-thumb {
    background-color: #acb4a8; /* 스크롤바 thumb 색상 */
    border-radius: 3px; /*스크롤바 thumb의 모서리 둥글기*/
  }

  /* 스크롤바의 thumb에 호버했을 때 스타일 지정 */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #818a7e; /* 스크롤바 thumb 호버 색상 */
  }

  /* 스크롤바의 thumb에 클릭했을 때 스타일 지정 */
  &::-webkit-scrollbar-thumb:active {
    background-color: #656c62; /* 스크롤바 thumb 클릭 색상 */
  }
`;

const TitleDiv = styled.div`
  padding: 1rem 0 3rem 0;
  text-align: center;
`;

const TodayDiv = styled.div`
  border-bottom: solid 2px #254021;
  padding-bottom: 0.5rem;
`;
