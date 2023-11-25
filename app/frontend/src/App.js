import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SalesTable from './components/SalesTable/SalesTable';
import Login from './components/Login/Login';
import ExitsTable from './components/ExitsTable/ExitsTable';
import Footer from './components/Footer/Footer';
import AddSale from './components/AddSale/AddSale';

function App() {
  return (
    <div className="App">
      
      <Login/> 
      {/* <Navbar/>  */}
      <AddSale/>
      {/* <SalesTable/>     */}
      {/* <ExitsTable/> */}
      {/* <Footer/>   */}
    </div>
  );
}

export default App;
