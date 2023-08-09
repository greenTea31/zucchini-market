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
import { Pagination } from "@mui/material";
// interface Item {
//   id: number;
// }

export default function ItemList() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Item[] | null>(null);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리
  const [page, setPage] = useState<number>(1); // pagination 선택된 페이지. 보낼 정보
  const [totalPages, setTotalPages] = useState(0); // 페이지네이션 토탈페이지, 받아올 정보.

  function getItems() {
    axios
      .get(
        `http://localhost:8080/api/item?page=${page}&category=${category}&keyword=${keyword}`
      )
      .then((response) => {
        setItems(response.data);
      });
  }

  const getItems = async () => {
    try {
      await axios
        .get(
          `http://localhost:8080/item?category=${selectedCategory}&keyword=${keyword}&page=${page}`
        )
        .then((response) => {
          setItems(response.data.content);
          setTotalPages(response.data.totalPages);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // 키워드 변경 확인
  useEffect(() => {
    console.log(keyword);
  }, [keyword]);
  // 카테고리랑 페이지 변경될 때마다.
  // 검색 시는 Search에서 처리함.
  useEffect(() => {
    getItems();
  }, [selectedCategory, page]);

  //페이지 버튼 누를 때마다 세팅
  const onChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  // 로딩페이지
  // 로딩 백에서 했대유...
  // useEffect(() => {
  //   if (data) {
  //     setIsLoading(false);
  //   }
  //   setIsLoading(false); // 여기는 지울거에용
  // }, [data]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <ContainerDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <UpperDiv>
        <TitleSpan>중고거래 매물</TitleSpan>
        <Category setSelectedCategory={setSelectedCategory} />
        <Search setKeyword={setKeyword} getItems={getItems} />
      </UpperDiv>
      <LowerDiv>
        <TitleDiv>
          <SubTitle>
            {selectedCategory ? selectedCategory : "전체보기"}
          </SubTitle>
          <Link to={"/item/register"}>
            <Button kind="small" Variant="pinkTonal" Rounded="medium">
              + 글 등록
            </Button>
          </Link>
        </TitleDiv>
        <ItemsContainer>
          {items ? (
            items.map((item, index) => <ItemEach item={item} />)
          ) : (
            <p>등록된 매물이 없습니다.</p>
          )}
        </ItemsContainer>
      </LowerDiv>
      <FooterDiv>
        {/* count에 totalPages 주세요, 10은 임시 */}
        <Pagination count={10} onChange={onChange} page={page} />
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

const FooterDiv = styled.div`
  display: flex;
  justify-content: end;
  align-self: center;
`;
