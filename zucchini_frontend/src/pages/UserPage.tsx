import styled from "styled-components";
import { motion } from "framer-motion";
import zucchiniImg from "../assets/images/1.png";
import CategorySecond from "../components/List/CategorySecond";
import Search from "../components/List/Search";
import { useState, useEffect } from "react";
import api from "../utils/api";
import ItemEachMini from "../components/List/ItemEachMini";
import { Pagination } from "@mui/material";
import { Button } from "../components/Common/Button";

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
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState<number>(1); // pagination 선택된 페이지. 보낼 정보
  const [totalPages, setTotalPages] = useState(0); // 페이지네이션 토탈페이지, 받아올 정보.

  async function getItems() {
    try {
      const response = await api.get(
        `/user/deal/sell?keyword=${keyword}&page=${page}`
      );
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

  return (
    <ContainerDiv>
      <LeftDiv>
        <TitleP>프로필</TitleP>
        <ImgDiv>
          <StyledImg src={zucchiniImg} />
        </ImgDiv>
        <AboutDiv>
          <AboutP>닉네임: 백조이김</AboutP>
          <AboutP>거래 등급: Lv.1 흙</AboutP>
          <AboutP>거래 횟수: 3</AboutP>
          <Button kind={"small"} Variant="redFilled">
            신고하기
          </Button>
        </AboutDiv>
      </LeftDiv>
      <RightDiv>
        <div>
          <SubP>백조이김 님의 판매 목록</SubP>
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
