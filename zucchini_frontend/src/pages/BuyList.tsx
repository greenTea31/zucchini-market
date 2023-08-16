import styled from "styled-components";
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

export default function BuyList() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState<number>(1); // pagination 선택된 페이지. 보낼 정보
  const [totalPages, setTotalPages] = useState(0); // 페이지네이션 토탈페이지, 받아올 정보.
  async function getItems() {
    // axios
    //   .get(`http://localhost:8080/user/deal/buy?keyword=${keyword}`)
    //   .then((response) => {
    //     setItems(response.data);
    //   });

    try {
      const response = await api.get(
        `/user/deal/buy?keyword=${keyword}&page=${page}&category=-1`
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
        <TitleSpan>나의 구매 목록</TitleSpan>
        <Search setKeyword={setKeyword} getItems={getItems} keyword={keyword} />
        <NoticeDiv>
          <AlertSvg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="#ff6600"
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </AlertSvg>
          <AlertTitle>거래 후 주의사항 안내</AlertTitle>
          <span>영상 통화 녹화영상은 구매 후 2주 동안만 보관됩니다.</span>
          <span>
            거래 영상 다시보기 후 [거래 확정] 또는 [확정 연장] 버튼을
            눌러주세요.
          </span>
        </NoticeDiv>
      </div>
      <LowerDiv>
        <ItemsContainer>
          {items && items.length > 0 ? (
            items.map((item, index) => <ItemEach item={item} />)
          ) : (
            <p>구매한 내역이 없습니다.</p>
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

const NoticeDiv = styled.div`
  width: 100%;
  height: 7.5rem;
  background-color: #d8d8d8;
  border-radius: 0.4rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

const AlertTitle = styled.span`
  font-weight: 700;
  font-size: 1rem;
  margin: 0.3rem;
`;

const AlertSvg = styled.svg`
  color: #ff6600;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: end;
  align-self: center;
  margin-top: 2rem;
`;
