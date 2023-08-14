import styled from "styled-components";
import { motion } from "framer-motion";
import zucchiniImg1 from "../assets/images/1.png";
import zucchiniImg2 from "../assets/images/2.png";
import zucchiniImg3 from "../assets/images/3.png";
import zucchiniImg4 from "../assets/images/4.png";
import zucchiniImg5 from "../assets/images/5.png";
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

// 등급에 따라 이미지 다르게 보여주기
function getImage(grade: number) {
  switch (grade) {
    case 1:
      return zucchiniImg1;
    case 2:
      return zucchiniImg2;
    case 3:
      return zucchiniImg3;
    case 4:
      return zucchiniImg4;
    case 5:
      return zucchiniImg5;
    default:
      return zucchiniImg5;
  }
}

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState<number>(1); // pagination 선택된 페이지. 보낼 정보
  const [totalPages, setTotalPages] = useState(0); // 페이지네이션 토탈페이지, 받아올 정보.
  const [isOpen, setIsOpen] = useState(false);

  async function getItems() {
    try {
      const response = await api.get(
        `http://localhost:8080/api/user/deal/sell/${username}?keyword=${keyword}&page=${page}`
      );
      setUsername(response.data.username);
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, [page]);

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const reportReasons = [
    "판매금지물품",
    "허위 매물",
    "전문판매업자",
    "도배",
    "욕설, 비방",
    "성희롱",
  ];

  const [user, setUser] = useState({
    nickname: "",
    grade: 0,
    deal_count: 0,
  });

  return (
    <ContainerDiv>
      <Modal isOpen={isOpen} toggle={toggle}>
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
        />
      </Modal>
      <LeftDiv>
        <TitleP>프로필</TitleP>
        <ImgDiv>
          <StyledImg src={getImage(user.grade)} />
        </ImgDiv>
        <AboutDiv>
          <AboutP>닉네임: {user.nickname}</AboutP>
          <AboutP>거래 등급: Lv.{user.grade}</AboutP>
          <AboutP>거래 횟수: {user.deal_count}</AboutP>
          <Button kind={"small"} Variant="redFilled" onClick={toggle}>
            신고하기
          </Button>
        </AboutDiv>
      </LeftDiv>
      <RightDiv>
        <div>
          <SubP>{user.nickname} 님의 판매 목록</SubP>
          <CategorySecond />
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
              <p>판매한 내역이 없습니다.</p>
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

const StyledImg = styled.img`
  height: 5rem;
  width: 5rem;
  object-fit: cover;
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

const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
