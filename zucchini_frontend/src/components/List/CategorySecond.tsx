import styled from "styled-components";

export default function CategorySecond() {
  const CategoryDiv = styled.div`
    display: flex;
    /* justify-content: center; */
    margin: 1.5rem 0rem;
  `;

  const CategoryBtn = styled.button`
    height: 2rem;
    width: 6rem;
    border-radius: 1rem;
    background-color: white;
    border: 2px solid #cde990;
    margin-right: 1rem;
    color: #254021;
    &:hover {
      background-color: #cde990;
      cursor: pointer;
    }
  `;

  return (
    <CategoryDiv>
      <CategoryBtn>전체보기</CategoryBtn>
      <CategoryBtn>판매중</CategoryBtn>
      <CategoryBtn>예약중</CategoryBtn>
      <CategoryBtn>판매완료</CategoryBtn>
    </CategoryDiv>
  );
}
