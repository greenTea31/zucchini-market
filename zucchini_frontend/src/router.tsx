import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UpdateUser from "./pages/UpdateUser";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import ItemList from "./pages/ItemList";
import CreateItem from "./pages/CreateItem";
import LikeList from "./pages/LikeList";
import BuyList from "./pages/BuyList";
import SellList from "./pages/SellList";
import ChatList from "./pages/ChatList";
import ItemDetail from "./pages/ItemDetail";
import ChatRoom from "./pages/ChatRoom";
import Conference from "./pages/Conference";
import ReplayBuyVideo from "./pages/ReplayBuyVideo";
import ReplaySellVideo from "./pages/ReplaySellVideo";
import ScheduleList from "./pages/ScheduleList";
import UpdateItem from "./pages/UpdateItem";
import SignUpAgreement from "./pages/SignUpAgreement";
import NotFound from "./pages/NotFound";
import TermsOfUse from "./components/Footer/TermsOfUse";
import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import PrivateRoute from "./components/Common/PrivateRoute";
import AboutReplay from "./pages/AboutReplay";
import AboutSchedule from "./pages/AboutSchedule";
import ConferenceRoom from "./components/Conference/ConferenceRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signup/agreement",
        element: <SignUpAgreement />,
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
        path: "/mypage/modify",
        element: <UpdateUser />,
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
        path: "/mypage/buy/video",
        element: <ReplayBuyVideo />,
      },
      {
        path: "/mypage/sell/video",
        element: <ReplaySellVideo />,
      },
      {
        path: "/mypage/schedule",
        element: <ScheduleList />,
      },
      {
        path: "/mypage/like",
        element: <LikeList />,
      },
      {
        path: "/mypage/chat",
        element: <ChatList />,
      },
      {
        path: "/chat/:no",
        element: <ChatRoom />,
      },
      {
        path: "/item",
        element: <ItemList />,
      },
      {
        path: "/item/:no",
        element: <ItemDetail />,
      },
      {
        path: "/item/register",
        element: (
          // <PrivateRoute>
          <CreateItem />
          // </PrivateRoute>
        ),
      },
      {
        path: "/item/:no/modify",
        element: <UpdateItem />,
      },
      {
        path: "/scheduleList",
        element: <ScheduleList />,
      },
      {
        path: "/conference/:conferenceNo",
        element: <ConferenceRoom />,
      },
      {
        path: "/termsofuse",
        element: <TermsOfUse />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/aboutreplay",
        element: <AboutReplay />,
      },
      {
        path: "/aboutschedule",
        element: <AboutSchedule />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
