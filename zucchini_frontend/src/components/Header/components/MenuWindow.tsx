import styled from "styled-components";
import MenuNavigation from "./MenuNavigation";
import menuNavigation from "../constants/menuNavigation";

interface IMenuProps {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuWindow({ toggle }: IMenuProps) {
  const clickExit = () => {
    toggle(false);
  };

  const handleMenuItemClick = () => {
    toggle(false);
  };
  return (
    <MenuWindowContainer>
      <ExitButton onClick={clickExit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          width="100%"
          height="100%"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </ExitButton>
      <MenuNavigation list={menuNavigation} onItemClick={handleMenuItemClick} />
    </MenuWindowContainer>
  );
}

const MenuWindowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  z-index: 9999;
`;

const ExitButton = styled.div`
  position: absolute;
  top: 20px;
  right: 64px;
  height: 48px;
  width: 48px;
`;