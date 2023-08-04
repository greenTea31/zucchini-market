import styled from "styled-components";
import watch from "../assets/images/watch.png";
import gradeFive from "../assets/images/5.png";
import Modal from "../components/Common/Modal";
import { useState, useEffect } from "react";
import SimpleCalendar from "../components/Schedule/SimpleCalendar";
import axios from "axios";
import { QueryClient } from "@tanstack/query-core";
import { QUERY_KEY } from "../constants/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import IToken from "../types/IToken";
import ClosedButton from "../components/Button/ClosedButton";
import { motion } from "framer-motion";

export default function ItemDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<any>(); // item 상태 추가
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  // accessToken필요할 때
  // const queryClient = useQueryClient();

  const queryClient = useQueryClient();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  // 아이템 가져오기
  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/item/${location.pathname.split("/")[2]}`
        );
        console.log(response);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getItem();
  }, [location.pathname]);

  const toggleLike = () => {
    // 좋아요 통신
    // /api/user/item/like/{itemNo} 좋아요 등록
    // /api/user/item/like/{itemNo} 좋아요 취소
    setLike((prev) => !prev);

    //     ax
    //     if (prev) {
    //       /api/user/item/like/{itemNo} -post
    //     } else {
    //       /api/user/item/like/{itemNo} -delete

    // }
  };

  const toChatRoom = async () => {
    try {
      // 채팅방 생성
      const response = await axios.post("http://localhost:8080/room", {
        headers: {
          Authorization: `Bearer ${
            (queryClient.getQueryData([QUERY_KEY.user]) as IToken).accessToken
          }`,
        },
      });

      // 응답 확인
      console.log(response.data);

      // useNavigate를 이용해 채팅방 이동
      navigate("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton onClick={toggle} />
        </ModalDiv>
        <ModalSpan>화상통화 일정 선택</ModalSpan>
        <SubSpan>일정은 상품당 한 번씩만 선택 가능합니다</SubSpan>
        <CalendarDiv>
          <SimpleCalendar />
        </CalendarDiv>
      </Modal>
      {/* <GoBackButton onClick={toPrev}/> */}
      <div>
        <SvgButton onClick={toggleLike}>
          {like ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </SvgButton>
      </div>
      <UpperDiv>
        <UpperLeftDiv>
          {/* src 태그 안에 제품 사진 */}
          <StyledImg src={watch}></StyledImg>
        </UpperLeftDiv>
        <UpperRightDiv>
          {/* item.categoryList 돌면서 뿌려주기*/}
          <CategorySpan>
            {item?.categoryList.map((category: any, index: number) => {
              return (
                <span key={index}>
                  {category}
                  {index < item?.categoryList.length - 1 ? "·" : null}
                </span>
              );
            })}
          </CategorySpan>
          <TitleSpan>{item?.title}</TitleSpan>
          <ContentSpan>{item?.content}</ContentSpan>
          <PriceSpan>{item?.price}원</PriceSpan>
          <SubSpan>
            {item?.createdAt}분 전 · 조회 {item?.view} · 찜 {item?.likeCount}
          </SubSpan>
          <SubSpan>
            신고하기
            <RedSvg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 24"
              stroke-width="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </RedSvg>
          </SubSpan>
          <SelectBtn onClick={toChatRoom}>채팅하기</SelectBtn>
          <SelectBtn onClick={toggle}>일정 선택하기</SelectBtn>
        </UpperRightDiv>
      </UpperDiv>
      <LowerDiv>
        <LowerLeftDiv>
          <AlertSvg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="#ff6600"
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </AlertSvg>
          <AlertTitle>거래 전 주의사항 안내</AlertTitle>
          <NoticeSpan>판매자가 별도의 메신저로 결제링크를 보내거나</NoticeSpan>
          <NoticeSpan>직거래(직접송금)을 유도하는 경우</NoticeSpan>{" "}
          <NoticeSpan>사기일 가능성이 높으니 거래를 자제해주시고</NoticeSpan>
          <NoticeSpan>신고하기 버튼을 눌러 신고해주시기 바랍니다.</NoticeSpan>
        </LowerLeftDiv>
        <LowerRightDiv>
          <SellerTitle>판매자 정보</SellerTitle>
          <SellerDiv>
            {/* 등급 관련 이미지 넣기.. */}
            <ImgDiv>
              <SellerImg src={gradeFive}></SellerImg>
            </ImgDiv>
            <SellerSpanDiv>
              <SellerName>{item?.seller.nickname}</SellerName>
              <span>{item?.seller.grade}</span>
              <SubSpan>판매중 3 · 거래완료 2</SubSpan>
            </SellerSpanDiv>
          </SellerDiv>
        </LowerRightDiv>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 0 10rem 13rem 10rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const RedSvg = styled.svg`
  height: 1rem;
  width: 1rem;
`;

const UpperDiv = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LowerDiv = styled.div`
  display: flex;
  height: 11rem;
`;

const LowerLeftDiv = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d8d8d8;
  border-radius: 0.4rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AlertTitle = styled.span`
  font-weight: 700;
  font-size: 1rem;
  margin: 0.3rem 0 0.6rem 0;
`;

const AlertSvg = styled.svg`
  color: #ff6600;
`;

const LowerRightDiv = styled.div`
  width: 50%;
  height: 9.4rem;
  padding: 1rem 1rem 0 1rem;
  margin-top: 1.5rem;
`;

const UpperLeftDiv = styled.div`
  width: 50%;
`;

const UpperRightDiv = styled.div`
  width: 50%;
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`;

const CategorySpan = styled.span`
  font-size: 0.9rem;
`;

const TitleSpan = styled.span`
  height: 4.6rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.3rem;
  margin: 0.5rem 0;
`;

const ContentSpan = styled.span`
  line-height: 1.3rem;
  margin-bottom: 1.5rem;
  height: 13.6rem;
`;

const PriceSpan = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SubSpan = styled.span`
  color: gray;
  margin-bottom: 0.5rem;
`;

const SelectBtn = styled.button`
  height: 3rem;
  background-color: #cde990;
  border: transparent;
  color: #254021;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-top: 0.15rem;
`;

const NoticeSpan = styled.span`
  margin-bottom: 0.3rem;
`;

const SellerDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-left: 1rem;
`;

const ImgDiv = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 5rem;
  border: solid 1px black;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SellerImg = styled.img`
  width: 4.3rem;
  height: 4.3rem;
`;

const SellerSpanDiv = styled.div`
  width: 50%;
  height: 8.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
  gap: 0.8rem;
`;

const SellerTitle = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  padding-left: 1rem;
`;

const SellerName = styled.span`
  font-weight: 700;
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #cde990;
  border: solid 1px #cde990;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-right: 0.4rem;

  &:hover {
    background-color: white;
  }
`;

const SvgButton = styled.button`
  float: right;
  margin-right: 1rem;
  height: 3rem;
  width: 3rem;
  background-color: white;
  border: solid 2px #d3d2d2;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const StatusSelect = styled.select`
  height: 3rem;
  width: 7rem;
  padding-left: 1rem;
  border-radius: 0.4rem;
  font-size: 1rem;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;
