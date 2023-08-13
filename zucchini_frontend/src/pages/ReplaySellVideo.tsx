import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../utils/api";
import ReactPlayer from 'react-player';

export default function ReplaySellVideo() {
  const [video, setVideo] = useState();
  const location = useLocation();
  const getVideo = async () => {
    try {
      const response = await api.get(
        `video/${location.pathname.split("/")[4]}`
      );
      console.log(response.data.link);
      setVideo(response.data.link);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <TitleSpan>
          {/* 타이틀 나중에 상품 정보로 바꿔줘야 함!!! */}
          갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
        </TitleSpan>
        <VideoScreenDiv>
          <ReactPlayer url={video} controls // 재생 컨트롤 표시
            width="100%"
            height="100%"/>
        </VideoScreenDiv>
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
