import "./styleAllSales.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import defaultDate from "../Controllers/defaultDate";
axios.defaults.baseURL = "http://localhost:3001";

function AllSales() {
  const [exitList, setExitList] = React.useState([]);
  const [sellList, setSellList] = React.useState([]);
  const [date, setDate] = React.useState();
  const navigate = useNavigate();
  const shopname = useParams();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

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
      const resExits = await axios.get(
        "/sales/exitsdate/" + date + "/" + shopname.shopname
      );
      setExitList(resExits.data);
      //return backend Object
    } catch (error) {
      setExitList([]);
    }
    try {
      const resSells = await axios.get(
        "/sales/salesdate/" + date + "/" + shopname.shopname
      );
      setSellList(resSells.data);
    } catch (error) {
      setSellList([]);
    }
  }

  return (
    <div className="general">
      <h1>Geral</h1>

      <h2>Informe a data desejada</h2>
      <div className="dateB">
        <input
          type="date"
          id="dateInput"
          value={date || ""}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
      {sellList.length > 0 && (
        <div className="divTable">
          <table className="beforeTable">
            <tr>
              <th scope="col" className="headerTable">
                ID
              </th>
              <th scope="col" className="headerTable">
                Descrição
              </th>
              <th scope="col" className="headerTable">
                Forma de pagamento
              </th>
              <th scope="col" className="headerTable">
                Valor
              </th>
              <th scope="col" className="headerTable">
                Vendedor
              </th>
            </tr>
          </table>
          {sellList.map((i) => {
            //itens
            return (
              <tr>
                <th scope="row">{i.idsell}</th> {/* Getting elements*/}
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
            );
          })}

          {exitList.map((i) => {
            //itens
            return (
              <tr>
                <th scope="row">{i.idout}</th> {/* Getting elements*/}
                <td>-{i.descr}</td>
                <td></td>
                <td>-{i.outvalue}</td>
                <td>{i.sellername}</td>
              </tr>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default AllSales;
