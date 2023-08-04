import styled from "styled-components";
import CategorySecond from "../components/List/CategorySecond";
import Search from "../components/List/Search";
import ItemEach from "../components/List/ItemEach";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading/Loading";
import { motion } from "framer-motion";
interface Item {
  id: number;
}

export default function SellList() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Item[] | null>(null);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");

  function getItems() {
    axios
      .get(`http://localhost:8080/user/deal/sell?keyword=${keyword}`)
      .then((response) => {
        setItems(response.data);
      });
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8080/api/mypage/sell")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
        <Search setKeyword={setKeyword} getItems={getItems} />
      </div>
      <LowerDiv>
        <ItemsContainer>
          {data && data.length > 0 ? (
            items.map((item, index) => <ItemEach item={item} />)
          ) : (
            <p>판매한 내역이 없습니다.</p>
          )}
        </ItemsContainer>
      </LowerDiv>
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
