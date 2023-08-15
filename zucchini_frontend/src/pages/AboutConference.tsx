import styled from "styled-components";
import { motion } from "framer-motion";
import conferenceImg from "../assets/images/aboutconference.png";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";

export default function AboutConference() {
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
        <TitleP>영상 통화 기능</TitleP>
        <ContentP>상품의 상태를 실시간으로 확인하며</ContentP>
        <ContentP>물건에 이상이 없는지 확인 후 거래하세요!</ContentP>
        <AboutContainer>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </StyledSvg>
            </CircleDiv>
            <AboutTitleP>실제 물품 확인</AboutTitleP>
            <AboutContentP>
              거래 전 물건에 이상이 없는지, 허위 매물은 아닌지 비대면으로 확인이
              가능합니다.
            </AboutContentP>
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
            <AboutTitleP>실시간 채팅</AboutTitleP>
            <AboutContentP>
              영상 통화 진행시 음성 연결이 어렵다면, 판매자와 구매자 함께
              채팅으로도 소통이 가능합니다!
            </AboutContentP>
          </AboutDiv>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </StyledSvg>
            </CircleDiv>
            <AboutTitleP>신고 기능</AboutTitleP>
            <AboutContentP>
              사용자의 안정성을 보장하기 위해 신고 기능을 활성화 하여 신속한
              대응이 가능합니다.
            </AboutContentP>
          </AboutDiv>
        </AboutContainer>
      </LeftDiv>
      <RightDiv>
        <AboutImg src={conferenceImg} />
      </RightDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem 5rem 0 5rem;
  height: 50rem;
  gap: 3rem;
  color: #254021;
`;

const LeftDiv = styled.div`
  width: 30rem;
  height: 38rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightDiv = styled.div`
  /* width: 55%; */
`;

const AboutImg = styled.img`
  width: 40rem;
`;

const TitleP = styled.p`
  font-size: 2.3rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
`;

const ContentP = styled.p`
  font-size: 1.1rem;
  line-height: 1.3rem;
`;

const AboutDiv = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 19rem;
`;

const AboutTitleP = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
`;

const AboutContentP = styled.p`
  line-height: 1.4rem;
  font-size: 0.9rem;
`;

const CircleDiv = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 5rem;
  background-color: #e4f8c2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSvg = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: #254021;
`;

const AboutContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
`;
