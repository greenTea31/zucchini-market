import styled from "styled-components";
import Modal from "../components/Common/Modal";
import Report from "../components/Common/Report";
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
import api from "../utils/api";
import NoImage from "../assets/images/NoImage.png";
import { getUser, getUserInfo } from "../hooks/useLocalStorage";
import dayjs from "dayjs";
import GradeText from "../components/Common/GradeText";
import GradeImage from "../components/Common/GradeImage";

interface ISeller {
  nickname: string;
  grade: number;
}

interface IDate {
  date: Date;
  status: number;
}

interface IItem {
  no: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  price: number;
  status: number;
  imageList: string[];
  likeCount: number;
  seller: ISeller;
  dateList: IDate[];
  categoryList: string[];
  view: number;
}

export default function ItemDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false); // 신고모달
  const [item, setItem] = useState<IItem>(); // item 상태 추가
  const [like, setLike] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [likeCount, setLikeCount] = useState();

  const navigate = useNavigate();
  // accessToken필요할 때
  // const queryClient = useQueryClient();

  const queryClient = useQueryClient();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleMy = () => {
    setIsMyOpen(!isMyOpen);
  };

  const toggleReport = () => {
    if (!localStorage.getItem("USER")) {
      navigate("/login");
      return;
    }

    setIsReporting(!isReporting);
  };

  const nextImage = () => {
    if (item?.imageList && item?.imageList.length > currentImageIndex + 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const location = useLocation();
  // 아이템 가져오기
  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await api.get(
          `item/${location.pathname.split("/")[2]}`
        );
        setItem(response.data);
        setLike(response.data.like);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getItem();
  }, []);

  // 하트(찜)
  const toggleLike = async () => {
    if (!localStorage.getItem("USER")) {
      alert("로그인이 필요합니다.");
      navigate(`/login`);
      return;
    }
    setLike((prev) => !prev);

    if (!like) {
      try {
        await api({
          method: "post",
          url: `user/item/like/${location.pathname.split("/")[2]}`,
        }).then((reponse: any) => console.log(reponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        await api({
          method: "delete",
          url: `user/item/like/${location.pathname.split("/")[2]}`,
        }).then((reponse: any) => console.log(reponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  // 본인 정보 가져오기, 채팅, 일정 선택 버튼 렌더링 여부에 필요
  const [userNickname, setUserNickname] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(getUserInfo());
    if (userInfo === null) {
      return;
    }
    setUserNickname(userInfo.nickname);
    console.log(userInfo.nickname);
  }, []);

  // 채팅방 이동
  const toChatRoom = async () => {
    if (!localStorage.getItem("USER")) {
      alert("로그인이 필요합니다.");
      navigate(`/login`);
      return;
    }
    const token = "Bearer " + getUser();
    try {
      // 채팅방 생성
      const response = await api({
        method: "post",
        url: "/room",
        headers: {
          Authorization: token,
        },
        data: {
          itemNo: location.pathname.split("/")[2],
        },
      });

      // 응답 확인
      console.log(response.data);

      // useNavigate를 이용해 채팅방 이동
      navigate(`/chat/${response.data}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (
      window.confirm(
        "한 번 삭제하면 복구할 수 없습니다.\n해당 게시글을 삭제하시겠습니까?"
      )
    ) {
      try {
        await api.delete(`item/${item?.no}`);
        navigate("/mypage/sell");
      } catch (error) {
        alert("게시글 삭제 도중 오류 발생 : 다시 시도해주세요");
        console.error("게시글 삭제 실패:", error);
      }
    }
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  };

  // 시간 차이 계산
  const timeDifferenceInMinutes = (time: Date) => {
    const currentTime = new Date();
    const timeDifferenceInMilliseconds = currentTime.getTime() - time.getTime();

    return Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  };

  const minToHour = (minutes: number) => {
    return Math.floor(minutes / 60);
  };

  const lessThanOneDay = (minutes: number) => {
    if (minutes < 1440) {
      return true;
    }
    return false;
  };

  // 신고사유
  const reportReasons = [
    "판매금지물품",
    "허위 매물",
    "전문판매업자",
    "도배",
    "욕설, 비방",
    "성희롱",
  ];

  const toUserPage = () => {
    navigate(`/userpage/${item?.seller.nickname}`);
  };

  useEffect(() => {
    console.log(item?.dateList);
  }, [item]);
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
        <ModalSpan>영상통화 일정 선택</ModalSpan>
        <SubSpan>일정은 상품당 한 번씩만 선택 가능합니다</SubSpan>
        <CalendarDiv>
          <SimpleCalendar
            itemNo={item?.no}
            mark={item?.dateList}
            myNickname={userNickname}
            sellerNickname={item?.seller.nickname}
          />
        </CalendarDiv>
      </Modal>

      {/* 내 일정 보는 모달 */}
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton onClick={toggle} />
        </ModalDiv>
        <ModalSpan>영상통화 일정 보기</ModalSpan>
        <CalendarDiv>
          <SimpleCalendar
            itemNo={item?.no}
            mark={item?.dateList}
            myNickname={userNickname}
            sellerNickname={item?.seller.nickname}
          />
        </CalendarDiv>
      </Modal>

      <Modal isOpen={isReporting} toggle={toggleReport}>
        <ModalDiv>
          <ClosedButton onClick={toggleReport} />
        </ModalDiv>
        <ModalSpan>신고하기</ModalSpan>
        <SubSpan>신고 사유를 선택해주세요.</SubSpan>
        <Report
          reportedNickname={item?.seller.nickname}
          itemNo={item?.no}
          reasons={reportReasons}
          roomNo={null}
          onCancel={toggleReport}
        />
      </Modal>
      {/* <GoBackButton onClick={toPrev}/> */}
      <div>
        <SvgButton onClick={toggleLike}>
          {!like ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </SvgButton>
      </div>
      <UpperDiv>
        <UpperLeftDiv>
          {item?.imageList && item?.imageList.length > 1 && (
            <BeforeButton onClick={prevImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6"
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </BeforeButton>
          )}

          {/* src 태그 안에 제품 사진 */}
          <StyledImg
            src={item?.imageList ? item?.imageList[currentImageIndex] : NoImage}
          ></StyledImg>
          {item?.imageList && item?.imageList.length > 1 && (
            <NextButton onClick={nextImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6"
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </NextButton>
          )}
        </UpperLeftDiv>
        <UpperRightDiv>
          {/* item.categoryList 돌면서 뿌려주기 '카테고리1·카테고리2·카테고리3형식 */}
          <CategorySpan>
            {item?.categoryList.map((category: any, index: number) => {
              return (
                <span key={index} style={{ lineHeight: "1.3rem" }}>
                  {category}
                  {index < item?.categoryList.length - 1 ? " · " : null}
                </span>
              );
            })}
          </CategorySpan>
          <TitleSpan>{item?.title}</TitleSpan>
          <ContentSpan>{item?.content}</ContentSpan>
          <PriceSpan>{item?.price.toLocaleString("ko-KR")}원</PriceSpan>
          <SubSpan>
            {lessThanOneDay(
              timeDifferenceInMinutes(new Date(item?.createdAt as string))
            )
              ? timeDifferenceInMinutes(new Date(item?.createdAt as string)) <
                60
                ? timeDifferenceInMinutes(new Date(item?.createdAt as string)) <
                  0
                  ? "0분전"
                  : `${timeDifferenceInMinutes(
                      new Date(item?.createdAt as string)
                    )} 분 전`
                : `${minToHour(
                    timeDifferenceInMinutes(new Date(item?.createdAt as string))
                  )}시간 전`
              : dayjs(new Date(item?.createdAt as string)).format(
                  "YYYY년 MM월 DD일"
                )}
            · 조회 {item?.view} · 찜 {item?.likeCount}
          </SubSpan>

          {item?.seller.nickname !== userNickname && (
            <TransBtn type="button" onClick={toggleReport} style={buttonStyle}>
              신고하기
              <RedSvg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 24"
                strokeWidth="1.5"
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </RedSvg>
            </TransBtn>
          )}

          <SelectBtnDiv>
            {item?.dateList.length !== 0 && (
              <SelectBtn onClick={toggle}>일정보기</SelectBtn>
            )}
            {item?.dateList.length === 0 && (
              <NoDiv>
                영상통화 일정 없음{" "}
                <NoTimeSvg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M160 0c13.3 0 24 10.7 24 24V64H328V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V192 144 128c0-35.3 28.7-64 64-64h40V24c0-13.3 10.7-24 24-24zM432 192H80V448c0 8.8 7.2 16 16 16H416c8.8 0 16-7.2 16-16V192zm-95 89l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </NoTimeSvg>
              </NoDiv>
            )}
            {item?.seller.nickname !== userNickname && (
              <SelectBtn onClick={toChatRoom}>채팅하기</SelectBtn>
            )}
            {item?.seller.nickname === userNickname && (
              <DeleteBtn onClick={handleDelete}>게시글 삭제</DeleteBtn>
            )}
          </SelectBtnDiv>
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
          <SellerDiv onClick={toUserPage}>
            {/* 등급 관련 이미지 넣기.. */}
            <ImgDiv>
              <GradeImage
                grade={item?.seller.grade || 1}
                height={70}
                width={70}
              />
            </ImgDiv>
            <SellerSpanDiv>
              <SellerName>{item?.seller.nickname}</SellerName>
              <span>
                <GradeDiv>
                  Lv.{item?.seller.grade}
                  <GradeText grade={item?.seller.grade || 1} />
                </GradeDiv>
              </span>
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
  display: flex;
  width: 50%;
  position: relative; /* 상대 위치 설정 */
`;

const BeforeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute; /* 절대 위치 설정 */
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4rem; /* 크기 조정 */
  height: 4rem; /* 크기 조정 */
`;

const NextButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute; /* 절대 위치 설정 */
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4rem; /* 크기 조정 */
  height: 4rem; /* 크기 조정 */
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  background-color: white;
  border-radius: 1rem;
  border: solid 1px lightgray;
`;

const UpperRightDiv = styled.div`
  width: 50%;
  padding: 0 1rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const CategorySpan = styled.span`
  font-size: 0.8rem;
`;

const TitleSpan = styled.span`
  min-height: 4.6rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.3rem;
  margin: 0.5rem 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const ContentSpan = styled.span`
  line-height: 1.3rem;
  margin-bottom: 1.5rem;
  height: 20rem;
  margin-left: 0.3rem;
  overflow-x: none;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-break: break-all;
  /* 스크롤바의 스타일 지정 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
    background-color: #e8e2d9; /* 스크롤바의 배경색 */
  }

  /* 스크롤바의 thumb 스타일 지정 */
  &::-webkit-scrollbar-thumb {
    background-color: #acb4a8; /* 스크롤바 thumb 색상 */
    border-radius: 3px; /*스크롤바 thumb의 모서리 둥글기*/
  }

  /* 스크롤바의 thumb에 호버했을 때 스타일 지정 */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #818a7e; /* 스크롤바 thumb 호버 색상 */
  }

  /* 스크롤바의 thumb에 클릭했을 때 스타일 지정 */
  &::-webkit-scrollbar-thumb:active {
    background-color: #656c62; /* 스크롤바 thumb 클릭 색상 */
  }
`;

const PriceSpan = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: 0.3rem;
`;

const SubSpan = styled.span`
  color: gray;
  margin-bottom: 1rem;
  margin-left: 0.3rem;
`;

const SelectBtn = styled.button`
  height: 3rem;
  background-color: #cde990;
  border: transparent;
  color: #254021;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-top: 0.15rem;
  font-size: 1rem;
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
  cursor: pointer;
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

const DeleteBtn = styled.button`
  height: 3rem;
  background-color: transparent;
  border: solid 2px red;
  color: red;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-top: 0.15rem;
  font-size: 1rem;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const TransBtn = styled.button`
  font-size: 1rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const GradeDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SelectBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NoDiv = styled.div`
  padding: 0 0 1rem 0.3rem;
  padding-bottom: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const NoTimeSvg = styled.svg`
  width: 1rem;
  height: 1rem;
`;
