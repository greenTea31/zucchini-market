import styled from "styled-components";
import Category from "../components/List/Category";
import { Button } from "../components/Common/Button";
import watch from "../assets/images/watch.png";
import Search from "../components/List/Search";

export default function ItemList() {
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

  const ItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 16rem;
    padding: 0.7rem 0.7rem 1.7rem 0.7rem;
    margin-bottom: 1rem;
    border: solid 1px #aeb9ad;
    border-radius: 2rem;
  `;

  const ItemImg = styled.img`
    border-radius: 1.5rem;
  `;

  const ItemTitle = styled.span`
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    margin: 0.4rem 0.1rem;
  `;

  const ItemContent = styled.span`
    color: gray;
    margin: 0.2rem;
  `;

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
          <Button Size="extraSmall" Variant="pinkTonal" Rounded="medium">
            + 글 등록
          </Button>
        </TitleDiv>
        <ItemsContainer>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>찜 15 | 조회 33</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>찜 15 | 조회 33</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>찜 15 | 조회 33</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>찜 15 | 조회 33</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>찜 15 | 조회 33</ItemContent>
          </ItemDiv>
        </ItemsContainer>
      </LowerDiv>
    </ContainerDiv>
  );
}
