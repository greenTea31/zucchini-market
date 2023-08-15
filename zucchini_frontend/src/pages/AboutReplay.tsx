import styled from "styled-components";
import replayImg from "../assets/images/AboutReplay.png";
import { motion } from "framer-motion";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";

export default function AboutReplay() {
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
        <AboutImg src={replayImg} />
      </LeftDiv>
      <RightDiv>
        <TitleP>영상 다시보기 &</TitleP>
        <TitleP>영상 기록 보관 기능</TitleP>
        <ContentP>
          거래 완료 후 2주 동안 영상통화 기록을 사이트 내에서 확인할 수
          있습니다.
        </ContentP>
        <AboutContainer>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
              </StyledSvg>
            </CircleDiv>
            <AboutTitleP>다시보기 기능</AboutTitleP>
            <AboutContentP>
              거래 후에도 영상 통화 내용을 재확인할 수 있어요.
            </AboutContentP>
          </AboutDiv>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </StyledSvg>
            </CircleDiv>
            <AboutTitleP>기록 및 보관</AboutTitleP>
            <AboutContentP>
              거래 후 2주 동안 보관되어 필요한 조치를 취할 수 있습니다.
            </AboutContentP>
          </AboutDiv>
          <AboutDiv>
            <CircleDiv>
              <StyledSvg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </StyledSvg>
            </CircleDiv>
            <AboutTitleP>실제 물품 비교</AboutTitleP>
            <AboutContentP>
              영상 내용과 실제 매물을 비교하여 사기 여부를 알 수 있어요.
            </AboutContentP>
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
  padding: 1rem 5rem 0 5rem;
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
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 26rem;
  height: 45rem;
`;

const TitleP = styled.p`
  font-size: 2.3rem;
  font-weight: 600;
`;

const ContentP = styled.p`
  font-size: 1.1rem;
  line-height: 1.7rem;
  margin-top: 1.6rem;
`;

const AboutContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 1rem;
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
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSvg = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: #254021;
`;
