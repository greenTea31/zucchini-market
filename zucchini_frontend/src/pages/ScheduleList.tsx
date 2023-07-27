import Calendar from "react-calendar";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ScheduleList() {
  return (
    <ContainerDiv>
      <TitleSpanDiv>
        <TitleSpan>나의 일정</TitleSpan>
      </TitleSpanDiv>
      <LowerDiv>
        <LeftDiv>
          <Calendar
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
        </LeftDiv>
        <RightDiv>
          <ScheduleDiv>
            <span>15:30</span>
            <span>갤럭시북 2 PRO</span>
            <StyledBtn>
              <Link to={"/conference"} target="_blank">
                입장
              </Link>
            </StyledBtn>
          </ScheduleDiv>
          <ScheduleDiv>
            <span>20:00</span>
            <span>인스탁스 미니 11</span>
          </ScheduleDiv>
        </RightDiv>
      </LowerDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 13rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const TitleSpanDiv = styled.div`
  text-align: center;
  margin-bottom: 1.7rem;
`;

const TitleSpan = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
`;

const LowerDiv = styled.div`
  height: 35rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const LeftDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const RightDiv = styled.div`
  width: 50%;
`;

const ScheduleDiv = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  height: 7rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.3rem;
`;

const StyledBtn = styled.button`
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  background-color: #ffd4d4;
  border: solid 2px #ffd4d4;
  border-radius: 0.4rem;

  &:hover {
    background-color: white;
    border: solid 2px #ffd4d4;
  }
`;
