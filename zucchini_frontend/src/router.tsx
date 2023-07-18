import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
