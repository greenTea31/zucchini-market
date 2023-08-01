import styled from "styled-components";
import BarLoader from "react-spinners/FadeLoader";
import Zucchini from "../../assets/images/zucchini.png";

export default function Loading() {
  return (
    <ContainerDiv>
      <StyledImg src={Zucchini}></StyledImg>
      <BarLoader color="#AACB73" />
      <StyledSpan>Loading....</StyledSpan>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding-top: 1rem;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
`;

const StyledImg = styled.img`
  height: 6rem;
  width: 6rem;
`;

const StyledSpan = styled.span`
  font-weight: 600;
  color: #ababab;
`;
