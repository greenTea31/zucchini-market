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
  const [data, setData] = useState<Item[] | null>(null);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");

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
    } finally {
      // 여기서 이걸 왜해야하는지 몰라서 자밋 주석
      // setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   getItems();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    // axios
    //   .get("http://localhost:8080/api/mypage/sell")
    //   .then((res) => setData(res.data))
    //   .catch((error) => console.log(error))
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, []);

  useEffect(() => {
    getItems();
  }, [page]);

  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    setIsLoading(false); // 이건 나중에 지울거에용
  }, [data]);

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
        <CategorySecond />
        <Search setKeyword={setKeyword} getItems={getItems} keyword={keyword} />
      </div>
      <LowerDiv>
        <ItemsContainer>
          {items && items.length > 0 ? (
            items.map((item, index) => <ItemEach item={item} />)
          ) : (
            <p>판매한 내역이 없습니다.</p>
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: end;
  align-self: center;
`;
