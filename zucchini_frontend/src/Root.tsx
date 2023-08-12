import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import ScrollToTop from "./constants/ScrollToTop";
import Footer from "./components/Footer/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Layout = styled.div`
  min-width: 90rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

function Root() {
  const location = useLocation();

  const exclude = ["/conference", "/signup/agreement"];
  return (
    <Layout>
      <AnimatePresence>
        <ReactQueryDevtools initialIsOpen={false} key={"reactQueryDevTools"} />
        <ScrollToTop />
        {exclude.includes(location.pathname) ? null : <Header key="header" />}
        <Outlet key="body" />
        <Footer key="footer" />
      </AnimatePresence>
    </Layout>
  );
}

export default Root;
