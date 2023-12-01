import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import RSalesTable from "./routes/RSalesTable";
import RExitsTable from "./routes/RExitsStable";
import LoginPage from "./routes/LoginPage";
import AddSalePage from "./routes/AddSalePage";
import AddExitPage from "./routes/AddExitPage";
import EditSellerPage from "./routes/EditSellerPage";
import PreferencesPageRoute from "./routes/PreferencesPageRoute";
import RouteProtector from "./routes/RouteProtector";
import  axios  from "axios";
const URL = process.env.REACT_APP_URL;
axios.defaults.baseURL = URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "salestable",
        element: <RSalesTable/>
      },
      {
        path: "exitstable",
        element: <RExitsTable/>
      },
      {
        path: "addsale",
        element: <AddSalePage/>
      },
      {
        path: "addexit",
        element: <AddExitPage/>
      },
      {
        path: "login/preferences/editseller",
        element: <EditSellerPage/>
      },
      {
        path: "/login/preferences",
        element: <RouteProtector element={<PreferencesPageRoute />} />
      }
    ]
  },
  {
    path: "/login",
    element: <RouteProtector element={<LoginPage/>} />
    
  }
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
