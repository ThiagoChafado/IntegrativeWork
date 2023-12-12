import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import RSalesTable from "./pages/RSalesTable";
import RExitsTable from "./pages/RExitsStable";
import LoginSellerPage from "./pages/LoginSellerPage";
import AddSalePage from "./pages/AddSalePage";
import AddExitPage from "./pages/AddExitPage";
import EditSellerPage from "./pages/EditSellerPage";
import PreferencesPageRoute from "./pages/PreferencesPageRoute";
import LoginSuperPage from "./pages/LoginSuperPage";
import DashboardPage from "./pages/DashboardPage";
import SelectShopPage from "./pages/SelectShopPage";
import SeeCashPage from "./pages/SeeCashPage";
import OpenCashPage from "./pages/OpenCashPage";
import CloseCashPage from "./pages/CloseCashPage";
import CalcPage from "./pages/CalcPage";
import RemoveSellPage from "./pages/Removesell";

const router = createBrowserRouter([
  {
    path: "/",

    element: <LoginSellerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addsale/:shopname",
    element: <AddSalePage />,
  },
  {
    path: "/addexit/:shopname",
    element: <AddExitPage />,
  },
  {
    path: "/salestable/:shopname",
    element: <RSalesTable />,
  },
  {
    path: "/exitstable/:shopname",
    element: <RExitsTable />,
  },
  {
    path: "/loginsuper/:shopname",
    element: <LoginSuperPage />,
  },
  {
    path: "/preferences/:shopname",
    element: <PreferencesPageRoute />,
  },
  {
    path: "/editseller/:shopname",
    element: <EditSellerPage />,
  },
  {
    path: "/calcpage/:shopname",
    element: <CalcPage />,
  },
  {
    path: "/removesell/:shopname",
    element: <RemoveSellPage />,
  },
  {
    path: "/editsells/:shopname",
    element: <ErrorPage />,
  },
  {
    path: "/dashboard/:shopname",
    element: <DashboardPage />,
  },
  {
    path: "/selectshop",
    element: <SelectShopPage />,
  },
  {
    path: "/seecash/:shopname",
    element: <SeeCashPage />
  },
  {
    path:"/opencash/:date/:shopname",
    element: <OpenCashPage/>
  },
  {
    path:"/closecash/:shopname",
    element:<CloseCashPage/>
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
