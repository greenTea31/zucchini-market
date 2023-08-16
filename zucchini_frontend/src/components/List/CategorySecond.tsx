import styled from "styled-components";
import { useState, useEffect } from "react";

const categories = ["판매중", "예약중", "판매완료"];

export default function CategorySecond({
  setSelectedCategory,
  setKeyword,
}: any) {
  const onClick = (index: number) => {
    setSelectedCategory(index);
  };

  const entireCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(-1);
    // setKeyword();
  };

  // useEffect(() => {}, []);

  return (
    <CategoryDiv>
      <CategoryBtn onClick={entireCategory}>전체보기</CategoryBtn>
      {categories.map((category, index) => (
        <CategoryBtn key={index} onClick={() => onClick(index)}>
          {category}
        </CategoryBtn>
      ))}
    </CategoryDiv>
  );
}

const CategoryDiv = styled.div`
  display: flex;
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
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    background-color: #cde990;
    box-shadow: 0 0 6px 4px #cde990;
    border: none;
  }
`;
