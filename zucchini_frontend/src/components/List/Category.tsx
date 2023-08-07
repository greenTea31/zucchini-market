import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from "../../utils/api";

export default function Category() {
  const [allCategoryList, setAllCategoryList] = useState([
    "디지털기기",
    "가구/인테리어",
    "유아동",
    "여성의류/잡화",
    "남성의류/잡화",
    "생활가전/주방",
    "도서/게임/음반",
    "뷰티/미용",
    "식물",
    "반려동물용품",
    "티켓/교환권",
    "기타 중고물품",
  ]);

  // 카테고리 가져오는 통신 로직 추가 필요
  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const response = await api({
  //         method: "get",
  //         url: "category",
  //       });
  //       // 이 밑에 내용이 맞는지...
  //       setAllCategoryList(response.data.category);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getCategories();
  // }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isScrollingLeft, setIsScrollingLeft] = useState(false);
  const [isScrollingRight, setIsScrollingRight] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const mousePositionX =
      event.clientX - container.getBoundingClientRect().left;
    const leftBoundary = containerWidth * 0.2;
    const rightBoundary = containerWidth * 0.8;

    setIsScrollingLeft(mousePositionX <= leftBoundary);
    setIsScrollingRight(mousePositionX >= rightBoundary);
  };

  const handleMouseLeave = () => {
    setIsScrollingLeft(false);
    setIsScrollingRight(false);
    cancelAnimationFrame(animationRef.current!);
  };

  const animateScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollSpeed = 2; // 스크롤 속도 조절 (값이 클수록 빠름)

    if (isScrollingLeft) {
      container.scrollLeft -= scrollSpeed;
    } else if (isScrollingRight) {
      container.scrollLeft += scrollSpeed;
    }

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    if (isScrollingLeft || isScrollingRight) {
      animateScroll();
    } else {
      cancelAnimationFrame(animationRef.current!);
    }
  }, [isScrollingLeft, isScrollingRight]);

  return (
    <CategoryDiv
      ref={containerRef}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {allCategoryList.map((category: any, index: number) => {
        return <CategoryBtn key={index}>{category}</CategoryBtn>;
      })}
    </CategoryDiv>
  );
}
const CategoryDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  margin: 1.5rem 0rem;

  overflow: hidden;
  width: 100%;
`;

const CategoryBtn = styled.button`
  height: 2rem;
  min-width: 130px;
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
