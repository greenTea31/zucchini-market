import styled from "styled-components";

const categories = ["전체보기", "판매중", "예약중", "판매완료"];

export default function CategorySecond({ setSelectedCategory }: any) {
  const onClick = (index: number) => {
    setSelectedCategory(index - 1);
  };

  return (
    <CategoryDiv>
      {categories.map((category, index) => (
        <CategoryBtn key={category} onClick={() => onClick(index)}>
          {category}
        </CategoryBtn>
      ))}
    </CategoryDiv>
  );
}

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
