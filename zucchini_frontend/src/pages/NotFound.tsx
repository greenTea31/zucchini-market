import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Zucchini from "../assets/images/zucchini.png";
import XColor from "../assets/images/xcolor.png";
import { Button } from "../components/Common/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Header />
      <ContainerDiv>
        <XImg src={XColor}></XImg>
        <LogoImg src={Zucchini}></LogoImg>
        <PageP>404 Error!</PageP>
        <StyledDiv>
          <TitleP>죄송합니다.</TitleP>
          <TitleP>요청하신 페이지를 찾을 수 없습니다.</TitleP>
        </StyledDiv>
        <StyledDiv>
          <ContentP>방문하시려는 페이지의 주소가 잘못 입력되었거나,</ContentP>
          <ContentP>
            페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
            없습니다.
          </ContentP>
          <ContentP>
            입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.
          </ContentP>
          <ContentP>감사합니다.</ContentP>
        </StyledDiv>
        <Link to={"/"}>
          <Button Size={"small"}>홈으로 이동</Button>
        </Link>
      </ContainerDiv>
      <Footer />
    </div>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 0.5rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const LogoImg = styled.img`
  height: 15rem;
  width: 15rem;
  margin-bottom: 2rem;
`;

const XImg = styled.img`
  height: 8rem;
  width: 8rem;
  padding-left: 23rem;
`;

const TitleP = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const ContentP = styled.p`
  color: gray;
  margin-bottom: 0.4rem;
`;

const PageP = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: #254021;
  margin-bottom: 1rem;
`;

const StyledDiv = styled.div`
  text-align: center;
  margin-bottom: 0.3rem;
`;
