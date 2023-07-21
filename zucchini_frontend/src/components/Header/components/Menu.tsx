import styled from "styled-components";

interface IMenuProps {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ toggle }: IMenuProps) {
  const menuClicked = () => {
    toggle((prev) => !prev);
  };
  return (
    <MenuClickArea onClick={menuClicked}>
      <MenuContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </MenuContainer>
    </MenuClickArea>
  );
}

const MenuClickArea = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const MenuContainer = styled.div`
  width: 24px;
  height: 24px;
  color: white;
`;
