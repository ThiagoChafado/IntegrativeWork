import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
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
    getDefaultDate();
  }, []);

  React.useEffect(() => {
    getCash();
  }, [date]);

  function getDefaultDate() {
    const pcDate = new Date();
    const year = pcDate.getFullYear();
    const month = (pcDate.getMonth() + 1).toString().padStart(2, "0"); //Month 0-11
    const day = pcDate.getDate().toString().padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;
    setDate(currentDate);
  }

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
