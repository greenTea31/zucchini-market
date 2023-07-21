import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UpdateUser from "./pages/UpdateUser";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
// import ItemList from "./pages/ItemList";
import Test from "./pages/test";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/myPage/modify",
        element: <UpdateUser />,
      },
      {
        path: "/main",
        element: <Main />,
      },
      // {
      //   path: "/items",
      //   element: <ItemList />,
      // },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/item/:no",
        element: <Detail />,

      },
    ],
  },
]);

export default router;
