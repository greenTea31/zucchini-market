import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import UpdateUser from "./pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/updateuser",
        element: <UpdateUser />,
      },
    ],
  },
]);

export default router;
