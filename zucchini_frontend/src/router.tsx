import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UpdateUser from "./pages/UpdateUser";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import ItemList from "./pages/ItemList";
import Test from "./pages/test";
import CreateItem from "./pages/CreateItem";
import LikeList from "./pages/LikeList";
import BuyList from "./pages/BuyList";
import SellList from "./pages/SellList";
import ChatList from "./pages/ChatList";
import ItemDetail from "./pages/ItemDetail";
import Detail from "./pages/Detail";
import ChatRoom from "./pages/ChatRoom";
import Conference from "./pages/Conference";

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
      {
        path: "/items",
        element: <ItemList />,
      },

      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/items/create",
        element: <CreateItem />,
      },
      {
        path: "/mypage/like",
        element: <LikeList />,
      },
      {
        path: "/mypage/buy",
        element: <BuyList />,
      },
      {
        path: "/mypage/sell",
        element: <SellList />,
      },
      {
        path: "/mypage/chat",
        element: <ChatList />,
      },
      {
        path: "/items/detail",
        element: <ItemDetail />,
      },
      {
        path: "/item/:no",
        element: <Detail />,
      },
      {
        path: "/chat",
        element: <ChatRoom />,
      },
      {
        path: "/conference",
        element: <Conference />,
      },
    ],
  },
]);

export default router;
