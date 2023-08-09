import styled from "styled-components";
import Category from "../components/List/Category";
import { Button } from "../components/Common/Button";
import Search from "../components/List/Search";
import ItemEach from "../components/List/ItemEach";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import { motion } from "framer-motion";
interface Item {
  id: number;
}

export default function ItemList() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Item[] | null>(null);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  function getItems() {
    axios
      .get(
        `http://localhost:8080/api/item?page=${page}&category=${category}&keyword=${keyword}`
      )
      .then((response) => {
        setItems(response.data);
      });
  }

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    setIsLoading(false); // 여기는 지울거에용
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
      <UpperDiv>
        <TitleSpan>중고거래 매물</TitleSpan>
        <Category />
        <Search setKeyword={setKeyword} getItems={getItems} />
      </UpperDiv>
      <LowerDiv>
        <TitleDiv>
          <SubTitle>전체보기</SubTitle>
          <Link to={"/item/register"}>
            <Button kind="small" Variant="pinkTonal" Rounded="medium">
              + 글 등록
            </Button>
          </Link>
        </TitleDiv>
        <ItemsContainer>
          {data && data.length > 0 ? (
            items && items.map((item, index) => <ItemEach item={item} />)
          ) : (
            <p>등록된 매물이 없습니다.</p>
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

const UpperDiv = styled.div``;

const LowerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
`;

const TitleSpan = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
`;

const SubTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: #254021;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
