import styled from "styled-components";
import CategorySecond from "../components/List/CategorySecond";
import Search from "../components/List/Search";
import ItemEach from "../components/List/ItemEach";
import { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import { motion } from "framer-motion";
import api from "../utils/api";
import { Pagination } from "@mui/material";
interface Item {
  id: number;
}

export default function SellList() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState<number>(1); // pagination 선택된 페이지. 보낼 정보
  const [totalPages, setTotalPages] = useState(0); // 페이지네이션 토탈페이지, 받아올 정보.

  const [selectedCategory, setSelectedCategory] = useState(-1); // 선택한 카테고리

  async function getItems() {
    try {
      const response = await api.get(
        `/user/deal/sell?keyword=${keyword}&page=${page}&category=${selectedCategory}`
      );
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, [selectedCategory, page]);

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <TitleSpan>나의 판매 목록</TitleSpan>
        <CategorySecond
          setSelectedCategory={setSelectedCategory}
          setKeyword={setKeyword}
        />
        <Search setKeyword={setKeyword} getItems={getItems} keyword={keyword} />
      </div>
      <LowerDiv>
        <ItemsContainer>
          {items && items.length > 0 ? (
            items.map((item, index) => <ItemEach item={item} />)
          ) : (
            <p>카테고리에 일치하는 매물이 없습니다.</p>
          )}
        </ItemsContainer>
      </LowerDiv>
      <FooterDiv>
        <Pagination count={totalPages} page={page} onChange={onChange} />
      </FooterDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 0 6rem 13rem 6rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const TitleSpan = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
`;

const LowerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding-bottom: 2rem;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: end;
  align-self: center;
  margin-top: 2rem;
`;
