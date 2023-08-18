import styled from "styled-components";
// import ReplayButton from "../Button/ReplayButton";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import NoImage from "../../assets/images/NoImage.png";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import dayjs from "dayjs";

interface IItem {
  no: number;
  title: string;
  content: string;
  createdAt: string;
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
  const [onMouse, setOnMouse] = useState(false);
  const [haveVideo, setHaveVideo] = useState(false);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/item/${item.no}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/video/check/${item.no}`);
        console.log(response.data);
        setHaveVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchData();
  }, [item]);

  const location = useLocation();
  const playVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${location.pathname}/video/${item.no}`);
  };

  return (
    <ItemDiv onClick={onClick}>
      {/* 이미지 {props?.item?.image}로 변경 */}
      {/* <ItemImg src={watch} /> */}
      <ItemImg src={item?.image ? item?.image : NoImage} />
      {/* ItemList,  BuyList, SellList에서 각각 쓰이는 컴포넌트이므로 버튼은 조건부 렌더링 필요 */}
      {item?.status === 1 && location.pathname !== "/item" && haveVideo && (
        <ReplayButton onClick={playVideo}>다시보기</ReplayButton>
      )}
      <ItemTitle>{item?.title}</ItemTitle>
      <ItemTitle>{item?.price.toLocaleString("ko-KR")}원</ItemTitle>
      <ItemContent>
        찜 {item?.likeCount} | 조회 {item?.view}
      </ItemContent>
      <ItemContent>
        {dayjs(item?.createdAt).format("YYYY-MM-DD hh:mm:ss")}
        {/* {moment(item?.createdAt).format("YYYY-MM-DD hh:mm:ss")} */}
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
  font-size: 0.85rem;
`;

const ReplayButton = styled.button`
  position: absolute;
  right: 1.6rem;
  bottom: 11rem;
  width: 5.5rem;
  height: 2.5rem;
  color: white;
  background-color: red;
  border: transparent;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  letter-spacing: 0.08rem;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: solid 2px red;
    color: red;
  }
`;
