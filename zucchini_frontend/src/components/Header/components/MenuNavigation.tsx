import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { logout } from "../../../hooks/useLogin";
import { getUser, removeUser } from "../../../hooks/useLocalStorage";

interface IItem {
  navName: string;
  navLink: string;
}

interface INavigation {
  list: IItem[];
  loggedOutList: IItem[];
  onItemClick: () => void;
}

export default function MenuNavigation({
  list,
  loggedOutList,
  onItemClick,
}: INavigation) {
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }));
  }, [controls]);

  return (
    <NavigationContainer>
      {localStorage.getItem("USER")
        ? list.map((element, index) => {
            if (element.navName === "로그아웃") {
              return (
                <NavigationItem
                  onClick={() => {
                    logout();
                    onItemClick();
                    const now = new Date();
                    document.cookie = `zucchiniCookie=; expires=${now.toUTCString()}; path=/;`;
                    navigate("/login");
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={controls}
                  custom={index}
                  to={element.navLink}
                  key={index}
                >
                  {element.navName}
                </NavigationItem>
              );
            }

            return (
              <NavigationItem
                onClick={() => {
                  onItemClick();
                  controls.start({ opacity: 0, x: -20 });
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                custom={index}
                to={element.navLink}
                key={index}
              >
                {element.navName}
              </NavigationItem>
            );
          })
        : loggedOutList.map((element, index) => (
            <NavigationItem
              onClick={() => {
                onItemClick();
                controls.start({ opacity: 0, x: -20 });
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={controls}
              custom={index}
              to={element.navLink}
              key={index}
            >
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
  gap: 14px;
  width: 24rem;
`;

const NavigationItem = styled(motion(Link))`
  user-select: none;
  color: #254021;
  padding: 1rem;
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;

  &:hover {
    background-color: #cde990;
    /* animation: fade-in-out 1s infinite alternate; */
  }

  /* @keyframes fade-in-out {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */
`;
