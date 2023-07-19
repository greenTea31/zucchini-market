import styled from "styled-components";
import MenuNavigation from "./MenuNavigation";

const MenuWindowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MenuWindow() {
  return (
    <MenuWindowContainer>
      <MenuNavigation
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
    </MenuWindowContainer>
  );
}
