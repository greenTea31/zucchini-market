import styled from "styled-components";
import Navigation from "./Navigation";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import MenuWindow from "./MenuWindow";

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  background-color: #aacb73;
  align-items: center;
  padding: 0 64px;
  box-sizing: border-box;
`;

const HeaderLeft = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-right: 80px;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(isMenuOpen);
  }, [isMenuOpen]);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo>애호박마켓</Logo>
        <Navigation
          list={[
            {
              navLink: "/items",
              navName: "상품보기",
            },
            {
              navLink: "/conference",
              navName: "화상통화",
            },
            {
              navLink: `/myPage`,
              navName: "마이페이지",
            },
          ]}
        />
      </HeaderLeft>

      <HeaderRight>
        <Menu toggle={setIsMenuOpen} />
        {isMenuOpen && <MenuWindow toggle={setIsMenuOpen} />}
      </HeaderRight>
    </HeaderContainer>
  );
}
