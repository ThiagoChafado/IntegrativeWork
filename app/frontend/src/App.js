import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SalesTable from './components/SalesTable/SalesTable';
import Login from './components/Login/Login';
import ExitsTable from './components/ExitsTable/ExitsTable';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Login/>
      <Navbar/>
      <ExitsTable/>
      <SalesTable/>
      <Footer/>
    </div>
  );
}

export default App;
