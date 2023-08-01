import styled from "styled-components";
import CategorySecond from "../components/List/CategorySecond";
import Search from "../components/List/Search";
import ItemEach from "../components/List/ItemEach";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SellList() {
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

  return (
    <ContainerDiv>
      <div>
        <TitleSpan>나의 판매 목록</TitleSpan>
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
