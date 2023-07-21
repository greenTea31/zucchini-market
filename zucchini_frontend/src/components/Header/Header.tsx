import styled from "styled-components";
import Navigation from "./components/Navigation";
import Menu from "./components/Menu";
import { useState, useEffect } from "react";
import MenuWindow from "./components/MenuWindow";
import navigation from "./constants/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(isMenuOpen);
  }, [isMenuOpen]);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo>애호박마켓</Logo>
        <Navigation list={navigation} />
      </HeaderLeft>

      <HeaderRight>
        <Menu toggle={setIsMenuOpen} />
        {isMenuOpen && <MenuWindow toggle={setIsMenuOpen} />}
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  background-color: #aacb73;
  align-items: center;
  padding: 0 64px;
  box-sizing: border-box;
  font-family: "IBM Plex Sans KR", sans-serif;
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
