import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import LogIn from "./pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
    ],
  },
]);

export default router;
