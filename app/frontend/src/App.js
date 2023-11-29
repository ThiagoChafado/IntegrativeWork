import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SalesTable from "./components/SalesTable/SalesTable";
import Login from "./components/Login/Login";
import ExitsTable from "./components/ExitsTable/ExitsTable";
import Footer from "./components/Footer/Footer";
import AddSale from "./components/AddSale/AddSale";
import AddExit from "./components/AddExit/AddExit";
import EditSeller from "./components/EditSeller/EditSeller";
import PreferencesPage from "./components/PreferencesPage/PreferencesPage";

import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
