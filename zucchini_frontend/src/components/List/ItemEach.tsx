import styled from "styled-components";
import watch from "../../assets/images/watch.png";
import ReplayButton from "../Button/ReplayButton";

export default function ItemEach() {
  return (
    <ItemDiv>
      <ItemImg src={watch} />
      {/* ItemList, BuyList, SellList에서 각각 쓰이는 컴포넌트이므로 버튼은 조건부 렌더링 필요 */}
      <ReplayButton>다시보기</ReplayButton>
      <ItemTitle>
        갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
      </ItemTitle>
      <ItemTitle>365,000원</ItemTitle>
      {/* <ItemContent>찜 15 | 조회 33</ItemContent> */}
      <ItemContent>닉네임.. 또는 시간..</ItemContent>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  padding: 0.7rem 0.7rem 1.7rem 0.7rem;
  margin-bottom: 1rem;
  border: solid 1px #aeb9ad;
  border-radius: 2rem;
  position: relative;
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
