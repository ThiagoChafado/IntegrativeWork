
import "./styleExit.css";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import defaultDate from "../Controllers/defaultDate";
axios.defaults.baseURL = "http://localhost:3001";
function AddExit() {
  const navigate = useNavigate();
  const [seller, setSeller] = React.useState();
  const [cpf, setCpf] = React.useState();
  const [outDescr, setOutDescr] = React.useState("");
  const [outValue, setOutValue] = React.useState("");
  const [date, setDate] = React.useState("");
  const [sellerList, setSellerList] = React.useState([]);
  const [selectedSeller, setSelectedSeller] = React.useState(null);
  const aux = useParams();
  const shopname = aux.shopname;

  React.useEffect(() => {
    getSeller();
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  async function handleSellerChange(event) {
    const selectedSellerName = event.target.value;
    const selectedSellerObject = sellerList.find(
      (seller) => seller.sellername === selectedSellerName

    );

    setSelectedSeller(selectedSellerObject);

    if (selectedSellerObject) {
      handleSeller(selectedSellerObject);
    }
  }

  async function handleSubmit() {
    try {
      const res = await axios.post("/sales/addexit", {
        cpf,
        outDescr,
        outValue,
        date,
        shopname,
      });
      if (res.data.inserted) {
        window.alert("INSERIDO");
      } else if (res.data.fkerror) {
        window.alert("Caixa não aberto!");
      } else {
        // Outros tipos de erro
        window.alert(
          "Erro.Verifique se todos os dados foram inseridos corretamente"
        );
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function handleSeller(selectedSellerObject) {
    try {
      const res = await axios.get(
        `/sellers/sellers/cpf/${shopname}/${selectedSellerObject.sellername}`
      );
      setCpf(res.data.sellercpf);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSeller() {
    try {
      const res = await axios.get(`/sellers/sellers/${shopname}`);
      setSellerList(res.data);
      //return backend Object
    } catch (error) {
      setSellerList([]);
    }
  }

  React.useEffect(() => {
    const currentDate = defaultDate();
    setDate(currentDate);
    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value = currentDate;
  }, []);

  return (
    <>
      <div className="containerExit">
        <div className="titleExit">
          <h1>Adicionar Saída</h1>
        </div>

        <div className="descriptionExit">
          <label htmlFor="description">Descrição</label>
          <input
          onChange={(e) => setOutDescr(e.currentTarget.value)}
          type="text"
          placeholder="Digite aqui..."
        />
        </div>

        <div className="valuesExit">
          <input
            id="date"
            type="date"
            placeholder="Data"
            onChange={(e) => setDate(e.currentTarget.value)}
          />
          <input
            id="value"
            type="text"
            placeholder="Valor"
            onChange={(e) => setOutValue(e.currentTarget.value)}
          />
        </div>

        <div className="dropdown">
          <select id="seller" onChange={handleSellerChange}>
            <option>Vendedor</option>
            {sellerList.map((i) => (
              <option key={i.id} value={i.sellername}>
                {i.sellername}
              </option>
            ))}
          </select>
        </div>

        <div className="buttonCExit">
          <button onClick={handleSubmit}>Adicionar</button>
        </div>
      </div>
    </>
  );
}

export default AddExit;
