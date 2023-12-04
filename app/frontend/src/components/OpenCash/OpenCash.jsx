import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
axios.defaults.baseURL = "http://localhost:3001";

function OpenCash() {
  const [date, setDate] = React.useState();
  const [cash, setCash] = React.useState([]);
  const shopname = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  React.useEffect(() => {
    getDefaultDate();
  }, []);

  React.useEffect(() => {
    getCash();
  }, [date]);


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
      if (dateControl) {
        dateControl.value = currentDate;
      }
    } else {
      const currentDate = `${year}-${month}-${day}`;
      setDate(currentDate);
      const dateControl = document.querySelector('input[type="date"]');
      if (dateControl) {
        dateControl.value = currentDate;
      }
    }
  }


  async function getCash() {
    try {
      const res = await axios.get("/cash/" + date + "/" + shopname.shopname);
      setCash(res.data);
      console.log(cash);
      //return backend Object
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
          value={date || ""}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </div>
    {cash.isopen == true && (<p>ABERTO</p>)}
    </div>
  );
}
export default OpenCash;
