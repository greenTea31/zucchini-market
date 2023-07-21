import styled from "styled-components";

export default function Category() {
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
      <CategoryBtn>전자제품</CategoryBtn>
      <CategoryBtn>가전제품</CategoryBtn>
      <CategoryBtn>의류/잡화</CategoryBtn>
      <CategoryBtn>서적/음반</CategoryBtn>
      <CategoryBtn>애완용품</CategoryBtn>
      <CategoryBtn>기타</CategoryBtn>
    </CategoryDiv>
  );
}
