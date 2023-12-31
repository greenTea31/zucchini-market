import styled from "styled-components";
import { motion } from "framer-motion";
import MenuNavigation from "./MenuNavigation";
import menuNavigation from "../constants/menuNavigation";
import loggedOutNavigation from "../constants/loggedOutNavigaion";
import Zucchini from "../../../assets/images/zucchini.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface IMenuProps {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuWindow({ toggle }: IMenuProps) {
  const location = useLocation();

  //뒤로가기 버튼 등을 누를 때 메뉴윈도우가 사라지지 않는 현상 해소
  const handleBackButton = () => {
    toggle(false);
  };
  useEffect(() => {
    // 뒤로가기 이벤트 리스너 등록
    window.addEventListener("popstate", handleBackButton);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 해제
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // x버튼
  const clickExit = () => {
    toggle(false);
  };

  // 각 메뉴로 이동 시
  const handleMenuItemClick = () => {
    toggle(false);
  };

  return (
    <MenuWindowContainer
      initial="closed"
      animate="open"
      exit="closed"
      variants={{
        open: { opacity: 1, display: "flex" },
        closed: { opacity: 0, display: "none" },
      }}
    >
      <ExitButton onClick={clickExit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#254021"
          width="100%"
          height="100%"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </ExitButton>
      <StyledImg src={Zucchini} />
      <MenuNavigation
        list={menuNavigation}
        loggedOutList={loggedOutNavigation}
        onItemClick={handleMenuItemClick}
      />
    </MenuWindowContainer>
  );
}

const MenuWindowContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  /* background-color: rgba(0, 0, 0, 0.7); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  z-index: 9999;
`;

const ExitButton = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  height: 48px;
  width: 48px;
  cursor: pointer;
`;

const StyledImg = styled.img`
  height: 4rem;
  width: 4rem;
  margin-bottom: 3rem;
`;
