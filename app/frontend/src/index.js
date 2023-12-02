import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./routes/ErrorPage";
import RSalesTable from "./routes/RSalesTable";
import RExitsTable from "./routes/RExitsStable";
import LoginSellerPage from "./routes/LoginSellerPage";
import AddSalePage from "./routes/AddSalePage";
import AddExitPage from "./routes/AddExitPage";
import EditSellerPage from "./routes/EditSellerPage";
import PreferencesPageRoute from "./routes/PreferencesPageRoute";

import LoginSuperPage from "./routes/LoginSuperPage";
import DashboardPage from "./routes/DashboardPage";


const router = createBrowserRouter([
  {
    path: "/",

    element: <LoginSellerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addsale",
    element: <AddSalePage />,
  },
  {
    path: "/addexit",
    element: <AddExitPage />,
  },
  {
    path: "/salestable",
    element: <RSalesTable />,
  },
  {
    path: "/exitstable",
    element: <RExitsTable />,
  },
  {
    path: "/loginsuper",
    element: <LoginSuperPage />,
  },
  {
    path: "/preferences",
    element: <PreferencesPageRoute />,
  },
  {
    path: "/editseller",
    element: <EditSellerPage/>
  },
  {
    path: "/editsells",
    element: <ErrorPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
