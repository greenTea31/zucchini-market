import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL } from "../../constants/url";

export default function Category({ setSelectedCategory, setKeyword }: any) {
  // const [clickedButton, setClickedButton] = useState();

  const [allCategories, setAllCategories] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // 처음 렌더링될 때, 카테고리 가져올 거예영
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(BASE_URL + "item/category");
        console.log(response.data);
        const categoryNames = response.data.map((item: any) => item.category);
        setAllCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCategories();
  }, []);

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

  // 카테고리 선택
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.textContent);
    setSelectedCategory(event.currentTarget.textContent);
    setKeyword("");
  };

  // 전체보기 누르면 초기화
  const entireCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory("");
  };

  // 버튼 active 효과
  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <CategoryDiv
      ref={containerRef}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <CategoryBtn onClick={entireCategory}>전체보기</CategoryBtn>
      {allCategories.map((category: any, index: number) => {
        return (
          <CategoryBtn
            key={index}
            onClick={onClick}
            className={isActive ? "active" : ""}
          >
            {category}
          </CategoryBtn>
        );
      })}
    </CategoryDiv>
  );
}
const CategoryDiv = styled.div`
  display: flex;
  margin: 1.5rem 0rem;
  padding-left: 1rem;
  overflow: hidden;
  width: 100%;
  align-items: center;
  height: 3rem;
`;

const CategoryBtn = styled.button`
  height: 2rem;
  min-width: 130px;
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
