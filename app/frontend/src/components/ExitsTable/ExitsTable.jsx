import './styleExits.css'
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import defaultDate from '../Controllers/defaultDate';
axios.defaults.baseURL = "http://localhost:3001";


function ExitsTable(){
  const [exitList, setExitList] = React.useState([]);
  const [date, setDate] = React.useState();
  const navigate = useNavigate();
  const shopname = useParams();

  React.useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/");
    }
  })

  React.useEffect(() => {
    getData();
  }, [date]);

  React.useEffect(() => {
    const currentDate = defaultDate();
    setDate(currentDate);
    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value = currentDate;
  }, []);


  async function getData() {
    try {
      const res = await axios.get("/sales/exitsdate/" + date +"/"+ shopname.shopname);
      setExitList(res.data);
      //return backend Object
    } catch (error) {
      setExitList([]); 
    }
  }


  return(
    <div className='general'>
      <h1>Saídas</h1>
      
      <h2>Informe a data desejada</h2>
      <div className='dateB'>
        <input
          type="date"
          id="dateInput"
          value={date || ""}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
      {
        exitList.length == 0 && (
        <div className="divTable">
          <table className="beforeTable">
            <tr>
                <th scope="col" className="headerTable">ID</th>
                <th scope="col"className="headerTable">Descrição</th>
                <th scope="col" className="headerTable">Valor</th>
                <th scope="col" className="headerTable">Responsável</th>
              </tr>
          </table>
      </div>
      
      )
      
      }

      {exitList.length > 0 && (
        <div className='divTable'>
          <table className='beforeTable'>
              <tr>
                <th scope="col" className="headerTable" >ID</th>
                <th scope="col" className="headerTable" >Descrição</th>
                <th scope="col" className="headerTable" >Valor</th>
                <th scope="col" className="headerTable" >Responsável</th>
              </tr>
            <tbody>
              {/* Populate table */}
              {exitList.map((i) => {
                //itens
                return (
                  <tr>
                    <td scope="row">{i.idout}</td> {/* Getting elements*/}
                    <td>{i.descr}</td>
                    <td>{i.outvalue}</td>
                    <td>{i.sellername}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>

  );
}
export default ExitsTable;