import styled from "styled-components";
import { motion } from "framer-motion";

export default function ReplaySellVideo() {
  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <TitleSpan>
          갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
        </TitleSpan>
        <VideoScreenDiv></VideoScreenDiv>
      </div>
    </ContainerDiv>
  );
}

const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem 15rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const VideoScreenDiv = styled.div`
  height: 40rem;
  margin: 1.5rem 0 0 0;
  background-color: black;
`;

const TitleSpan = styled.span`
  font-size: 2rem;
`;
