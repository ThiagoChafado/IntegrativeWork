import axios from "axios";
import React from "react";
import "./styleSalesTable.css";
import { useNavigate,useParams } from "react-router-dom";
import defaultDate from "../Controllers/defaultDate";
axios.defaults.baseURL = "http://localhost:3001";

function SalesTable() {
  const [sellList, setSellList] = React.useState([]);
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

  function subTotal() {
    return sellList
      .reduce((total, item) => total + parseFloat(item.sellvalue), 0)
      .toFixed(2);
  }


  async function getData() {
    try {
      const res = await axios.get("/sales/salesdate/" + date +"/"+ shopname.shopname);
      setSellList(res.data);
      //return backend Object
    } catch (error) {
      setSellList([]);
    }
  }
  return (
    <div className="general">
      <h1>Vendas</h1>
      
      <h2>Informe a data desejada</h2>
      <div className="dateB">
        <input
          type="date"
          id="dateInput"
          value={ date || ""}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>

      {
        sellList.length == 0 && (
        
          <div className="divTable">
            <table className="beforeTable">
               <tr>
                  <th scope="col" className="headerTable">ID</th>
                  <th scope="col"className="headerTable">Descrição</th>
                  <th scope="col" className="headerTable">Forma de pagamento</th>
                  <th scope="col" className="headerTable">Valor</th>
                  <th scope="col" className="headerTable">Vendedor</th>
                </tr>
            </table>
          </div>



        )//CSS this

      }
      {sellList.length > 0 && (
        <div className="divTable">
          <table className="beforeTable">
              <tr>
                <th scope="col" className="headerTable" >ID</th>
                <th scope="col" className="headerTable" >Descrição</th>
                <th scope="col" className="headerTable" >Forma de pagamento</th>
                <th scope="col" className="headerTable" >Valor</th>
                <th scope="col" className="headerTable" >Vendedor</th>
              </tr>
            <tbody>
              {/* Populate table */}
              {sellList.map((i) => {
                //itens
                return (
                  <>
                    <tr>
                      <td scope="row">{i.idsell}</td> {/* Getting elements*/}
                      <td>{i.descr}</td>
                      <>
                        {i.mtdpayment == 1 && <td>Dinheiro</td>}
                        {i.mtdpayment == 2 && <td>Cartão de crédito</td>}
                        {i.mtdpayment == 3 && <td>Cartão de débito</td>}
                        {i.mtdpayment == 4 && <td>Pix</td>}
                      </>
                      <td>{i.sellvalue}</td>
                      <td>{i.sellername}</td>
                    </tr>
                  </>
                );
              })}
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row">Subtotal:</th>
              <th scope="row">{subTotal()}</th>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalesTable;
