import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
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
    <div>
      <p>Selecione uma data</p>

      <div className="dateB">
        <input
          type="date"
          id="dateInput"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>

      {cash.length > 0 && (
        <div>
          {cash.map((i) => {
            return (
              <>
                {i.isopen == true && (
                  <>
                    <p>ABERTO</p>
                    <p>TROCO:{i.change}</p>
                  </>
                )}
                {i.isopen == false && (
                  <>
                    <p>FECHADO</p>
                  </>
                )}
              </>
            );
          })}
        </div>
      )}

      {cash.length === 0 && (
        <>
          <p>Caixa não aberto</p>
          <button onClick={handleOpen}>Abrir novo caixa</button>
        </>
      )}
    </div>
  );
}

export default SeeCash;
