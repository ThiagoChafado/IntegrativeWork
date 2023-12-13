import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import defaultDate from '../Controllers/defaultDate';
import axios from "axios";
import './closeStyle.css'

axios.defaults.baseURL = "http://localhost:3001";

function CloseCash() {
  const [cash, setCash] = React.useState([]);
  const [date, setDate] = React.useState("");
  const [closed,setClosed] = React.useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const shopname = param.shopname;

  React.useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate(`/loginsuper/${shopname}`);
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


  async function getCash() {
    try {
      const res = await axios.get("/cash/" + date + "/" + shopname);
      setCash(res.data);
    } catch (error) {
      setCash([]);
    }
  }

  async function handleClose(){
    try{
        const res = await axios.put("/cash/closecash",{date,shopname});
        if(res.data.closed){
            setClosed(true);
            getCash();

        }
    }catch(error){
        console.log(error);
    }
  }

  return (
    <div className="removeS">
      <h1>Fechar Caixa</h1>
      <h2>Selecione Uma Data</h2>

      <div className="dateB">
        <input
          type="date"
          id="dateInput"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
      {cash.map((i) => {
        return (
          <>
            {i.isopen == true && (
              <div className="organize">
                <h3 className="marginC" >Caixa Aberto</h3>
                <button className="inputRemove"  onClick={handleClose}>Fechar</button>
              </div>
            )}
            {i.isopen == false && (
              <>
                <h2>Fechado</h2>
              </>
            )}
            
          </>
        );
      })}
      {cash.length === 0 && (
        <>
          <h3 className="marginC" >Caixa Não Aberto</h3>
        </>
      )}
    </div>
  );
}
export default CloseCash;
