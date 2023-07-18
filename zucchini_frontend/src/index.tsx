import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyles from "./GlobalStyles";
// import GlobalFonts from "./assets/styles/fonts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <GlobalFonts /> */}
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
