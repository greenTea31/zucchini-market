import styled from "styled-components";
import { motion } from "framer-motion";
import aboutSchedule from "../assets/images/aboutschedule2.png";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";

export default function AboutSchedule() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LeftDiv>
        <AboutImg src={aboutSchedule} />
      </LeftDiv>
      <RightDiv>
        <div>
          <TitleP>판매자, 구매자 간</TitleP>
          <TitleP>일정 조율 기능</TitleP>
        </div>
        <AboutContainer>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M128 32V64H80c-26.5 0-48 21.5-48 48v48H480V112c0-26.5-21.5-48-48-48H384V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H192V32c0-17.7-14.3-32-32-32s-32 14.3-32 32zM480 192H32V464c0 26.5 21.5 48 48 48H432c26.5 0 48-21.5 48-48V192zM256 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H176c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z" />
              </StyledSvg>
            </CircleDiv>
            <div>
              <ContentP>판매자는 게시글 작성 시</ContentP>
              <ContentP>영상통화가 가능한 일정 선택</ContentP>
            </div>
          </AboutDiv>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </StyledSvg>
            </CircleDiv>
            <div>
              <ContentP>구매자는 판매자가 선택한 일정 중</ContentP>
              <ContentP>가능한 일정 선택</ContentP>
            </div>
          </AboutDiv>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
              >
                <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
              </StyledSvg>
            </CircleDiv>
            <ContentP>채팅을 통해서도 일정 조율이 가능해요 !</ContentP>
          </AboutDiv>
        </AboutContainer>
      </RightDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  background: #e4f8c2;
  padding: 1rem 5rem 0 7rem;
  height: 50rem;
  gap: 3rem;
`;

const LeftDiv = styled.div`
  width: 60%;
`;

const AboutImg = styled.img`
  width: 100%;
`;

const RightDiv = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 26rem;
  height: 45rem;
`;

const TitleP = styled.p`
  font-size: 2.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContentP = styled.p`
  font-size: 1.1rem;
  line-height: 1.7rem;
`;

const StyledSvg = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: #254021;
`;

const CircleDiv = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const AboutContainer = styled.div`
  height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
`;
