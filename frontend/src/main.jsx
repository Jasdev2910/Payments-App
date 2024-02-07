import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Signup } from "./components/Signup.jsx";
import { Signin } from "./components/Signin.jsx";
import { SendMoney } from "./components/SendMoney.jsx";
import Body from "./components/Body.jsx";
import Update from "./components/Update.jsx";
import Dashboard from "./components/Dashboard.jsx";
import History from "./components/History.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/body",
    element: <Body />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "update",
        element: <Update />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "/send",
    element: <SendMoney />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
