import styled from "styled-components";
import ReplayButton from "../Button/ReplayButton";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import NoImage from "../../assets/images/NoImage.png";

interface IItem {
  no: number;
  title: string;
  content: string;
  updatedAt: string;
  price: number;
  status: number;
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

  const playVideo = () => {
    navigate(`${location.pathname}/video/${item.no}`);
  };

  return (
    <ItemDiv onClick={onClick}>
      {/* 이미지 {props?.item?.image}로 변경 */}
      {/* <ItemImg src={watch} /> */}
      <ItemImg src={item?.image ? item?.image : NoImage} />
      {/* ItemList,  BuyList, SellList에서 각각 쓰이는 컴포넌트이므로 버튼은 조건부 렌더링 필요 */}
      {item?.status === 2 && location.pathname !== "/item" && (
        <ReplayButton onClick={playVideo}>다시보기</ReplayButton>
      )}
      <ItemTitle>{item?.title}</ItemTitle>
      <ItemTitle>{item?.price.toLocaleString("ko-KR")}원</ItemTitle>
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
  height: 24rem;
  padding: 0.7rem 0.7rem 1.7rem 0.7rem;
  margin-bottom: 1rem;
  border: solid 1px #aeb9ad;
  border-radius: 2rem;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemImg = styled.img`
  border-radius: 1.5rem;
  width: 100%; /* 이미지의 너비를 100%로 설정하여 컨테이너에 맞춤 */
  height: 100%; /* 이미지의 높이를 100%로 설정하여 컨테이너에 맞춤 */
  object-fit: contain; /* 이미지가 컨테이너를 완전히 채우면서 비율 유지 */
  background-color: white; /* 빈 공간의 배경색을 투명하게 설정 */
  max-height: 16rem;
`;

const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 2rem;
  margin: 0.4rem 0.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ItemContent = styled.span`
  color: gray;
  margin: 0.2rem;
  text-overflow: ellipsis;
`;
