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
  padding-top: 5rem;
`;

const StyledImg = styled.img`
  height: 6rem;
  width: 6rem;
`;

const StyledSpan = styled.span`
  font-weight: 600;
  color: #ababab;
`;
