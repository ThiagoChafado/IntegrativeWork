import axios from "axios";
import React from "react";
import './styleSalesTable.css';

axios.defaults.baseURL = "http://localhost:3001";

function SalesTable() {
  const [sellList, setSellList] = React.useState([]);
  const [date, setDate] = React.useState();

  React.useEffect(() => {
    getData();
  }, [date]);

  React.useEffect(() => {
    getDefaultDate();
  }, []);

  function subTotal() {
    return sellList
      .reduce((total, item) => total + parseFloat(item.sellvalue), 0)
      .toFixed(2);
  }

  function getDefaultDate() {
    const pcDate = new Date();
    const year = pcDate.getFullYear();
    const month = pcDate.getMonth() + 1; //Month 0-11
    const day = pcDate.getDate();
    const currentDate = `${year}-${month}-${day}`;

    setDate(currentDate);

    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value = date;
  }

  async function getData() {
    try {
      const res = await axios.get("/salesdate/" + date);
      setSellList(res.data);
      //return backend Object
    } catch (error) {
      setSellList([]);
    }
  }
  return (
    <>
      <div>
        <input
          type="date"
          id="dateInput"
          value={date || ""}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
      {
        sellList.length == 0 && <p>Empty</p> //CSS this
      }
      {sellList.length > 0 && (
        <div class="container-fluid p-0">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Descrição</th>
                <th scope="col">Forma de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Vendedor</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table */}
              {sellList.map((i) => {
                //itens
                return (
                  <>
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
    </>
  );
}

export default SalesTable;
