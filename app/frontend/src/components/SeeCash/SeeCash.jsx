import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import './styleCash.css'

import defaultDate from "../Controllers/defaultDate";
axios.defaults.baseURL = "http://localhost:3001";

function SeeCash() {
  const [cash, setCash] = React.useState([]);
  const [date, setDate] = React.useState("");
  const shopname = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  React.useEffect(() => {
    const currentDate = defaultDate();
    setDate(currentDate);
    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value = currentDate;
  }, []);

  React.useEffect(() => {
    getCash();
  }, [date]);

  function handleOpen(){
    return navigate(`/opencash/${date}/${shopname.shopname}`);
  }

  async function getCash() {
    try {
      const res = await axios.get("/cash/" + date + "/" + shopname.shopname);
      setCash(res.data);
    } catch (error) {
      setCash([]);
    }
  }

  return (
    <div className="cash" >
      <h1>Selecione Uma Data</h1>
      <div className="dateB">
        <input
          type="date"
          id="dateInput"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>

      {cash.length === 0 && (
        <div className="buttonCash">
          <h4>Caixa Para o Dia {date} Não Aberto</h4>
          <button onClick={handleOpen}>Abrir Novo Caixa</button>
        </div>
      )}

      {cash.length > 0 && (
        <div>
          {cash.map((i) => {
            return (
              <div className="openCash">
                {i.isopen == true && (
                  <div className="openC">
                    <h4 id="hopen">Caixa Aberto</h4>
                    <h4>Troco: {i.change}</h4>
                  </div>
                )}
                {i.isopen == false && (
                  <>
                    <p>FECHADO</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

    
    </div>
  );
}

export default SeeCash;
