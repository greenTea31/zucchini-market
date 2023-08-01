import styled from "styled-components";
import { Link } from "react-router-dom";

interface INavigation {
  list: IItem[];
}

export default function Navigation({ list }: INavigation) {
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
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const NavigationItem = styled(Link)`
  color: white;
  user-select: none;
`;

interface IItem {
  navName: string;
  navLink: string;
}
