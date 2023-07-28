import styled from "styled-components";
import Category from "../components/List/Category";
import { Button } from "../components/Common/Button";
import Search from "../components/List/Search";
import ItemEach from "../components/List/ItemEach";
import { Link } from "react-router-dom";

export default function ItemList() {
  return (
    <ContainerDiv>
      <UpperDiv>
        <TitleSpan>중고거래 매물</TitleSpan>
        <Category />
        <Search />
      </UpperDiv>

      <LowerDiv>
        <TitleDiv>
          <SubTitle>전체보기</SubTitle>
          <Link to={"/items/create"}>
            <Button Size="small" Variant="pinkTonal" Rounded="medium">
              + 글 등록
            </Button>
          </Link>
        </TitleDiv>
        <ItemsContainer>
          {[1, 2, 3, 4, 5].map((e, i) => (
            <ItemEach />
          ))}
        </ItemsContainer>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const UpperDiv = styled.div``;

const LowerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
`;

const TitleSpan = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
`;

const SubTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: #254021;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
