import React from "react";
import axios from "axios";
import "../AddSale/styleSale.css";
import { useNavigate, useParams } from "react-router-dom";
import defaultDate from "../Controllers/defaultDate";
axios.defaults.baseURL = "http://localhost:3001";

function AddSale() {
  const [seller, setSeller] = React.useState();
  const [cpf, setCpf] = React.useState();
  const [sellDescr, setSellDescr] = React.useState("");
  const [sellvalue, setSellValue] = React.useState("");
  const [payment, setPayment] = React.useState("Dinheiro");
  const [date, setDate] = React.useState("");
  const [sellerList, setSellerList] = React.useState([]);
  const [selectedSeller, setSelectedSeller] = React.useState(null);
  const aux = useParams();
  const shopname = aux.shopname;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  React.useEffect(() => {
    getSeller();
  }, []);

  async function handleSubmit() {
    try {
      const res = await axios.post("/sales/addsale", {
        cpf,
        sellDescr,
        sellvalue,
        payment,
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

  function handlePaymentChange(event) {
    setPayment(event.target.value);
  }

  return (
    <div className="container">
      <div className="title">
        <h1>Adicionar Venda</h1>
      </div>

      <div className="description">
        <label htmlFor="description">Descrição</label>
        <input
          onChange={(e) => setSellDescr(e.currentTarget.value)}
          type="text"
          placeholder="Digite aqui..."
        />
      </div>

      <div className="values">
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
          onChange={(e) => setSellValue(e.currentTarget.value)}
        />

        <div className="dropdown">
          <select id="payment" onChange={handlePaymentChange}>
            <option value={"Dinheiro"}>Dinheiro</option>
            <option value={"Pix"}>Pix</option>
            <option value={"Cartão de Débito"}>Cartão de Débito</option>
            <option value={"Cartão de Crédito"}>Cartão de Crédito</option>
          </select>
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
      </div>

      <div className="buttonC">
        <button onClick={handleSubmit}>Adicionar</button>
      </div>
    </div>
  );
}

export default AddSale;
