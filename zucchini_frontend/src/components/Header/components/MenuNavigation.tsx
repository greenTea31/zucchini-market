import styled from "styled-components";
import { Link } from "react-router-dom";

interface IItem {
  navName: string;
  navLink: string;
}

interface INavigation {
  list: IItem[];
}

export default function MenuNavigation({ list }: INavigation) {
  return (
    <NavigationContainer>
      {list.map((element, index) => (
        <NavigationItem to={element.navLink} key={index}>
          {element.navName}
        </NavigationItem>
      ))}
    </NavigationContainer>
  );
}

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const NavigationItem = styled(Link)`
  user-select: none;
  color: white;
`;
