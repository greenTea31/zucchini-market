import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UpdateUser from "./pages/UpdateUser";
import Main from "./pages/Main";
import Test from "./pages/test";

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
        path: "/myPage/modify",
        element: <UpdateUser />,
      },
      {
        path: "/main",
        element: <Main />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

export default router;
