import styled from "styled-components";

export default function Category() {
  const CategoryDiv = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0.5rem;
  `;

  const CategoryBtn = styled.button`
    height: 2rem;
    width: 6rem;
    border-radius: 1rem;
    background-color: white;
    border: 2px solid #cde990;

    &:hover {
      background-color: #cde990;
      cursor: pointer;
    }
  `;

  return (
    <CategoryDiv>
      <CategoryBtn>전체보기</CategoryBtn>
      <CategoryBtn>전자제품</CategoryBtn>
      <CategoryBtn>가전제품</CategoryBtn>
      <CategoryBtn>의류/잡화</CategoryBtn>
      <CategoryBtn>서적/음반</CategoryBtn>
      <CategoryBtn>애완용품</CategoryBtn>
      <CategoryBtn>기타</CategoryBtn>
    </CategoryDiv>
  );
}
