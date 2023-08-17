import styled from "styled-components";
import { motion } from "framer-motion";
import CategorySecond from "../components/List/CategorySecond";
import Search from "../components/List/Search";
import { useState, useEffect } from "react";
import api from "../utils/api";
import ItemEachMini from "../components/List/ItemEachMini";
import { Pagination } from "@mui/material";
import { Button } from "../components/Common/Button";
import Modal from "../components/Common/Modal";
import ClosedButton from "../components/Button/ClosedButton";
import Report from "../components/Common/Report";
import GradeImage from "../components/Common/GradeImage";
import GradeText from "../components/Common/GradeText";
import { BASE_URL } from "../constants/url";
import axios from "axios";
import { constants } from "buffer";
import Loading from "../components/Loading/Loading";

interface ISeller {
  nickname: string;
  grade: number;
  deal_count: number;
}

interface IItem {
  no: number;
  title: string;
  price: number;
  image: string;
  seller: ISeller;
  date: string;
}

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState<number>(1); // pagination 선택된 페이지. 보낼 정보
  const [totalPages, setTotalPages] = useState(0); // 페이지네이션 토탈페이지, 받아올 정보.
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1); // 선택한 카테고리
  const [isLoading, setIsLoading] = useState(false);

  async function getItems() {
    try {
      const nick = window.location.pathname.split("/")[2];
      setUsername(nick);
      const response = await api.get(
        BASE_URL +
          `user/deal/sell/${nick}?keyword=${keyword}&page=${page}&category=${selectedCategory}`
      );
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getUser() {
    const nick = window.location.pathname.split("/")[2];

    try {
      const response = await api.get(`/user/${nick}`);
      const { nickname, grade, dealCount } = response.data;
      setUser({
        nickname,
        grade,
        deal_count: dealCount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, [selectedCategory, page]);

  useEffect(() => {
    getUser();
  }, []);

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };

  // const reportReasons = [
  //   "판매금지물품",
  //   "허위 매물",
  //   "전문판매업자",
  //   "도배",
  //   "욕설, 비방",
  //   "성희롱",
  // ];

  const [user, setUser] = useState({
    nickname: "",
    grade: 0,
    deal_count: 0,
  });

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContainerDiv>
      {/* <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <ClosedButton onClick={toggle} />
        </ModalDiv>
        <ModalSpan>신고하기</ModalSpan>
        <SubSpan>신고 사유를 선택해주세요.</SubSpan>
        <Report
          reportedNickname={username}
          itemNo={null}
          reasons={reportReasons}
          roomNo={null}
          onCancel={toggle}
        />
      </Modal> */}
      <LeftDiv>
        <TitleP>프로필</TitleP>
        <ImgDiv>
          <GradeImage grade={user.grade || 1} height={80} width={80} />
        </ImgDiv>
        <AboutDiv>
          <AboutP>닉네임: {user.nickname}</AboutP>
          <AboutP>
            <GradeDiv>
              거래 등급: Lv.{user.grade}
              <GradeText grade={user.grade} />
            </GradeDiv>
          </AboutP>
          <AboutP>거래 횟수: {user.deal_count}</AboutP>
          {/* <Button kind={"small"} Variant="redFilled" onClick={toggle}>
            신고하기
          </Button> */}
        </AboutDiv>
      </LeftDiv>
      <RightDiv>
        <div>
          <SubP>{user.nickname} 님의 판매 목록</SubP>
          <CategorySecond
            setSelectedCategory={setSelectedCategory}
            setKeyword={setKeyword}
          />
          <Search
            setKeyword={setKeyword}
            getItems={getItems}
            keyword={keyword}
          />
        </div>
        <LowerDiv>
          <ItemsContainer>
            {items && items.length > 0 ? (
              items.map((item, index) => <ItemEachMini item={item} />)
            ) : (
              <AlertP>카테고리에 일치하는 매물이 없습니다.</AlertP>
            )}
          </ItemsContainer>
        </LowerDiv>
        <FooterDiv>
          <Pagination count={totalPages} page={page} onChange={onChange} />
        </FooterDiv>
      </RightDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding: 5rem;
  margin: 0 8rem 13rem 8rem;
  min-height: 40rem;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  gap: 1rem;
`;

const RightDiv = styled.div`
  width: 45rem;
`;

const ImgDiv = styled.div`
  height: 8rem;
  width: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px #aacb73;
  border-radius: 5rem;
`;

const TitleP = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const AboutDiv = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const AboutP = styled.p`
  margin-bottom: 1rem;
`;

const SubP = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const LowerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const AlertP = styled.p`
  width: 17rem;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-bottom: 2rem;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
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

const SubSpan = styled.span`
  color: gray;
  margin-bottom: 2rem;
`;

const GradeDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;
