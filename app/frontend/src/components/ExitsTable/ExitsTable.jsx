import './styleExits.css'
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
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
    getDefaultDate();
  }, []);

  function getDefaultDate() {
    const pcDate = new Date();
    const year = pcDate.getFullYear();
    const month = pcDate.getMonth() + 1; //Month 0-11
    const day = pcDate.getDate();
    if (day < 10) {
      const newday = `0${day}`;
      const currentDate = `${year}-${month}-${newday}`;
      setDate(currentDate);
      console.log(date);

      const dateControl = document.querySelector('input[type="date"]');
      dateControl.value = date;
    } else {
      const currentDate = `${year}-${month}-${day}`;
      setDate(currentDate);
      const dateControl = document.querySelector('input[type="date"]');
      dateControl.value = date;
    }
  }

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
        <div class="container-fluid p-0">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table */}
              {exitList.map((i) => {
                //itens
                return (
                  <tr>
                    <th scope="row">{i.idout}</th> {/* Getting elements*/}
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