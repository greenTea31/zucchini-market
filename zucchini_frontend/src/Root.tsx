import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import ScrollToTop from "./constants/ScrollToTop";
import { useEffect } from "react";

const Layout = styled.div`
  min-width: 100rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

function Root() {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  const exclude = ["/conference", "/signup/agreement"];

  return (
    <Layout>
      <ScrollToTop />
      {exclude.includes(location.pathname) ? null : <Header />}
      <Outlet />
    </Layout>
  );
}

export default Root;
