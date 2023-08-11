import styled from "styled-components";
import watch from "../../assets/images/watch.png";
import ReplayButton from "../Button/ReplayButton";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import NoImage from "../../assets/images/NoImage.png";

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

export default function ItemEach({ item }: IProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/item/${item.no}`);
  };

  const location = useLocation();

  return (
    <ItemDiv onClick={onClick}>
      {/* 이미지 {props?.item?.image}로 변경 */}
      {/* <ItemImg src={watch} /> */}
      <ItemImg src={item?.image ? item?.image : NoImage} />
      {/* ItemList, BuyList, SellList에서 각각 쓰이는 컴포넌트이므로 버튼은 조건부 렌더링 필요 */}
      {location.pathname === "/item" ? null : (
        <ReplayButton>상태표시{item?.status} | 다시보기</ReplayButton>
      )}
      <ItemTitle>{item?.title}</ItemTitle>
      <ItemTitle>{item?.price}원</ItemTitle>
      <ItemContent>
        찜 {item?.likeCount} | 조회 {item?.view}
      </ItemContent>
      <ItemContent>
        {moment(item?.updatedAt).format("YYYY-MM-DD hh:mm:ss")}
      </ItemContent>
      <ItemContent>{item?.category}</ItemContent>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  padding: 0.7rem 0.7rem 1.7rem 0.7rem;
  margin-bottom: 1rem;
  /* margin-right: 1rem; */
  border: solid 1px #aeb9ad;
  border-radius: 2rem;
  position: relative;
  cursor: pointer;
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
