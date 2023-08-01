import styled from "styled-components";
import watch from "../../assets/images/watch.png";
import ReplayButton from "../Button/ReplayButton";
import moment from "moment";

interface Item {
  id: number;
}

interface ItemEachProps {
  data: Item;
}

interface IItem {
  no: number;
  title: string;
  content: string;
  updatedAt: string;
  price: number;
  status: boolean;
  image?: string;
  likeCount: number;
  category?: string[];
  view: number;
}

interface IProps {
  item: IItem;
}

export default function ItemEach(props: IProps) {
  return (
    <ItemDiv>
      {/* 이미지 {props?.item?.image}로 변경 */}
      <ItemImg src={watch} />
      {/* ItemList, BuyList, SellList에서 각각 쓰이는 컴포넌트이므로 버튼은 조건부 렌더링 필요 */}
      <ReplayButton>상태표시{props?.item?.status} | 다시보기</ReplayButton>
      <ItemTitle>{props?.item?.title}</ItemTitle>
      <ItemTitle>365,000원</ItemTitle>
      <ItemContent>
        찜 {props?.item?.likeCount} | 조회 {props?.item?.view}
      </ItemContent>
      <ItemContent>
        {moment(props?.item?.updatedAt).format("YYYY-MM-DD hh:mm:ss")}
      </ItemContent>
      <ItemContent>{props?.item?.category}</ItemContent>
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
