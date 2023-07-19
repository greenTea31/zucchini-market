import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";

const Layout = styled.div``;

function Root() {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
}

export default Root;
