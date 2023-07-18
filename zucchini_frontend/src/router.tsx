import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import UpdateUser from "./pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/updateuser",
        element: <UpdateUser />,
      },
    ],
  },
]);

export default router;
