import styled from "styled-components";
import CategorySecond from "../components/List/CategorySecond";
import Search from "../components/List/Search";
import ItemEach from "../components/List/ItemEach";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading/Loading";

interface Item {
  id: number;
}

export default function LikeList() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Item[] | null>(null);

  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  function getItems() {
    axios
      .get(`http://localhost:8080/user/item/like?keyword=${keyword}`)
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
      .get("http://localhost:8080/api/mypage/like")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContainerDiv>
      <div>
        <TitleSpan>나의 찜한 목록</TitleSpan>
        <CategorySecond />
        <Search setKeyword={setKeyword} getItems={getItems} />
      </div>
      <LowerDiv>
        <ItemsContainer>
          {items.map((item, index) => (
            <ItemEach item={item} />
          ))}
        </ItemsContainer>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
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

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  padding: 0.7rem 0.7rem 1.7rem 0.7rem;
  margin-bottom: 1rem;
  border: solid 1px #aeb9ad;
  border-radius: 2rem;
`;

const ItemImg = styled.img`
  border-radius: 1.5rem;
`;

const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4rem;
  margin: 0.4rem 0.1rem;
`;

const ItemContent = styled.span`
  color: gray;
  margin: 0.2rem;
`;
