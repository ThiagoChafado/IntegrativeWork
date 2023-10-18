import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SalesTable from './components/SalesTable/SalesTable';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <SalesTable/>
      <Footer/>
    </div>
  );
}

export default App;
