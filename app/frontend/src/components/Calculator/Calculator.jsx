
import "../CurrentSeller/styleEdit.css";
import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import defaultMonth from "../Controllers/defaultMonth";
axios.defaults.baseURL = "http://localhost:3001";
function Calculator() {
  const [selectedMonth, setSelectedMonth] = React.useState();
  const [sellerList, setSellerList] = React.useState();
  const aux = useParams();
  const shopname = aux.shopname;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  React.useEffect(() => {
    getDefaultMonth();
  }, []);

  React.useEffect(() => {
    if (selectedMonth != undefined) {
      getPcc();
    }
  }, [selectedMonth]);

  async function getPcc() {
    const res = await axios.get(
      "/sellers/sellersells/" + shopname + "/" + selectedMonth
    );
    setSellerList(res.data);
  }

  function getDefaultMonth() {
    const pcMonth = defaultMonth();
    setSelectedMonth(pcMonth);
  }

  return (
    <div>
      <input
        type="month"
        id="monthInput"
        name="monthInput"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.currentTarget.value)}
      ></input>
      {sellerList &&
        sellerList.map((i) => {
           const calculate = ((i.pccommision/100 ) * i.sum).toFixed(2);
          return (
            <div>
              <p>
                
                
                VENDEDOR:{i.sellername} | TOTAL NO MÊS: R${i.sum} | COMISSÃO: R${calculate}
              </p>
            </div>
          );
        })}
    </div>
  );
}
export default Calculator;
