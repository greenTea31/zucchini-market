import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import chatList from "../assets/images/chatList.jpg";
import likeList from "../assets/images/likeList.jpg";
import buyList from "../assets/images/buyList.jpg";
import sellList from "../assets/images/sellList.jpg";
import todoList from "../assets/images/todoList.jpg";
import femaleImg from "../assets/images/female.jpg";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    setUser(JSON.parse(sessionStorage.getItem("USER_INFO") as string));
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
        <SubTitleP>{user?.id} 님 안녕하세요!</SubTitleP>
        <MyInfoDiv>
          <Img src={femaleImg}></Img>
          <InfoPDiv>
            <InfoP>이메일 : {user?.email}</InfoP>
            <InfoP>닉네임 : {user?.nickname}</InfoP>
            <InfoP>등급 : Lv.{user?.grade}</InfoP>
            <InfoP>거래횟수 : {user?.dealCount}</InfoP>
            <InfoP>신고횟수 : {user?.reportCount}</InfoP>
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
  height: 10rem;
  width: 10rem;
  margin: 2rem;
  border: 0.1rem solid #254021;
  border-radius: 7rem;
`;

const InfoP = styled.p`
  margin: 0.7rem;
  color: #254021;
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
  align-items: center;
`;

const InfoPDiv = styled.div`
  gap: 1rem;
  min-width: 13rem;
  max-height: 10rem;
`;
