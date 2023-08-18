import styled from "styled-components";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import NoImage from "../../assets/images/NoImage.png";
import dayjs from "dayjs";

interface IItem {
  no: number;
  title: string;
  content: string;
  createdAt: string;
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

export default function ItemEachMini({ item }: IProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/item/${item.no}`);
  };

  const location = useLocation();

  return (
    <ItemDiv onClick={onClick}>
      <ItemImg src={item?.image ? item?.image : NoImage} />
      <ItemTitle>{item?.title}</ItemTitle>
      <ItemTitle>{item?.price.toLocaleString("ko-KR")}원</ItemTitle>
      <ItemContent>
        찜 {item?.likeCount} | 조회 {item?.view}
      </ItemContent>
      <ItemContent>
        {dayjs(item?.createdAt).format("YYYY-MM-DD hh:mm:ss")}
        {/* {moment(item?.updatedAt).format("YYYY-MM-DD hh:mm:ss")} */}
      </ItemContent>
      <ItemContent>{item?.category}</ItemContent>
    </ItemDiv>
  );
}

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  padding: 0.7rem 0.7rem 1.7rem 0.7rem;
  margin-bottom: 1rem;
  border: solid 1px #aeb9ad;
  border-radius: 2rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemImg = styled.img`
  border-radius: 1.5rem;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
  max-height: 10rem;
`;

const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4rem;
  margin: 0.4rem 0.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ItemContent = styled.span`
  color: gray;
  margin: 0.2rem;
  text-overflow: ellipsis;
  font-size: 0.8rem;
`;
