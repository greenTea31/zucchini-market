import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import chatList from "../assets/images/chatList.jpg";
import likeList from "../assets/images/likeList.jpg";
import buyList from "../assets/images/buyList.jpg";
import sellList from "../assets/images/sellList.jpg";
import todoList from "../assets/images/todoList.jpg";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GradeImage from "../components/Common/GradeImage";
import GradeText from "../components/Common/GradeText";

interface IUser {
  id: string;
  nickname: string;
  name: string;
  phone: string;
  gender: boolean;
  email: string;
  reportCount: number;
  grade: number;
  dealCount: number;
  isLocked: number;
}

export default function MyPage() {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("USER_INFO") as string));
    // console.log(user);
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <UpperDiv>
        <TitleSpan>마이페이지</TitleSpan>
        <SubTitleP>{user?.nickname} 님 안녕하세요!</SubTitleP>
        <MyInfoDiv>
          <GradeImg>
            {/* <Img src={getImage(user?.grade)} /> */}
            <GradeImage grade={user?.grade || 1} height={100} width={100} />
          </GradeImg>
          <InfoPDiv>
            <div>
              <InfoTitleP>개인정보</InfoTitleP>
              <InfoP>아이디 : {user?.id}</InfoP>
              <InfoP>이메일 : {user?.email}</InfoP>
              <InfoP>전화번호 : {user?.phone}</InfoP>
              <InfoP>
                성별 :{" "}
                {user?.gender === false
                  ? "여성"
                  : user?.gender === true
                  ? "남성"
                  : user?.gender === null
                  ? "선택안함"
                  : "선택안함"}
              </InfoP>
            </div>
            <div>
              <InfoTitleP>거래정보</InfoTitleP>
              <InfoP>
                <GradeDiv>
                  등급 : Lv.{user?.grade}
                  <GradeText grade={user?.grade || 1} />
                </GradeDiv>
              </InfoP>
              <InfoP>거래횟수 : {user?.dealCount}</InfoP>
              <InfoP>신고횟수 : {user?.reportCount}</InfoP>
            </div>
          </InfoPDiv>
        </MyInfoDiv>
        <div>
          <Link to={"/mypage/modify"}>
            <InfoBtn>내 정보 변경</InfoBtn>
          </Link>
          <Link to={"/mypage/modifypass"}>
            <InfoBtn>비밀번호 변경</InfoBtn>
          </Link>
        </div>
      </UpperDiv>
      <div>
        <hr />
      </div>
      <LowerDiv>
        <Link to={"/mypage/chat"}>
          <MenuDiv>
            <MenuImg src={chatList}></MenuImg>
            <MenuP>채팅 내역</MenuP>
          </MenuDiv>
        </Link>
        <Link to={"/mypage/like"}>
          <MenuDiv>
            <MenuImg src={likeList}></MenuImg>
            <MenuP>찜한 내역</MenuP>
          </MenuDiv>
        </Link>
        <Link to={"/mypage/buy"}>
          <MenuDiv>
            <MenuImg src={buyList}></MenuImg>
            <MenuP>구매 내역</MenuP>
          </MenuDiv>
        </Link>
        <Link to={"/mypage/sell"}>
          <MenuDiv>
            <MenuImg src={sellList}></MenuImg>
            <MenuP>판매 내역</MenuP>
          </MenuDiv>
        </Link>
        <Link to={"/mypage/schedule"}>
          <MenuDiv>
            <MenuImg src={todoList}></MenuImg>
            <MenuP>나의 일정</MenuP>
          </MenuDiv>
        </Link>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;
  margin-bottom: 5rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const UpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleSpan = styled.span`
  font-size: 3rem;
  font-weight: 500;
  padding: 2rem;
`;

const SubTitleP = styled.p`
  font-size: 1.3rem;
`;

const Img = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
`;

const InfoP = styled.p`
  margin: 0.7rem;
  color: #254021;
`;

const InfoTitleP = styled.p`
  margin: 0.7rem;
  color: #254021;
  font-weight: 500;
  font-size: 1.1rem;
`;

const InfoBtn = styled.button`
  padding: 0.8rem 1.2rem;
  margin: 1rem;
  border-radius: 0.4rem;
  background-color: #ffd4d4;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  border: solid 2px transparent;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: solid 2px #ffd4d4;
    color: #ffd4d4;
    font-weight: 500;
  }
`;

const LowerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem 2rem;
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 15rem;
  height: 13rem;
  padding: 1rem;
  cursor: pointer;
`;

const MenuImg = styled.img`
  width: 10rem;
`;

const MenuP = styled.p``;

const MyInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoPDiv = styled.div`
  gap: 1rem;
  min-width: 13rem;
  max-height: 10rem;
  display: flex;
`;

const GradeImg = styled.div`
  height: 10rem;
  width: 10rem;
  margin: 2rem;
  border: 0.1rem solid #254021;
  border-radius: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GradeDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;
