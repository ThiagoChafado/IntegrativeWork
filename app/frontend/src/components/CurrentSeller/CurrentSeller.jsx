import axios from "axios";
import React from "react";
import "./styleEdit.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formatDate } from "../Controllers/formateDate";
axios.defaults.baseURL = "http://localhost:3001";

function  CurrentSellers() {
  const [sellerList, setSellerList] = React.useState([]);
  const [editor, setEditor] = React.useState(false);
  const [newSeller, setNewSeller] = React.useState(false);
  const [sellPass, setSellPass] = React.useState("");
  const [sellername, setSellerName] = React.useState("");
  const [dtbirth, setDtBirth] = React.useState("");
  const [pccommision, setPccCommision] = React.useState("");
  const [sellercpf, setSellerCpf] = React.useState("");
  const navigate = useNavigate();
  const aux = useParams();
  const shopname = aux.shopname;
  React.useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate(`/loginsuper/${shopname}`);
    }
  }, [navigate]);

  React.useEffect(() => {
    getData();
  }, []);

  function handleEdit(name, birth, commision, sellercpf) {
    setSellerName(name);
    setDtBirth(birth);
    setPccCommision(commision);
    setSellerCpf(sellercpf);
    setEditor(true);
  }

  function handleNew() {
    setNewSeller(true);
  }

  async function handleSaveNew() {
    try {
      const res = await axios.post(`/sellers/sellernew`, {
        sellername,
        dtbirth,
        pccommision,
        shopname,
        sellercpf,
        sellPass,
      });
      if (res.data.inserted) {
        console.log("inserted");
        setNewSeller(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove(selectedcpf) {
    try {
      const res = await axios.delete("/sellers/sellerdelete", {
        data: { sellercpf: selectedcpf },
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  
  }
  

  async function handleSaveEdit() {
    try {
      const res = await axios.put(`/sellers/sellersedit`, {
        sellername,
        dtbirth,
        pccommision,
        shopname,
        sellercpf,
      });
      if (res.data.update) {
        console.log("Updated");
        setEditor(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const res = await axios.get(`/sellers/sellersnoadmin/${shopname}`);
      setSellerList(res.data);
      //return backend Object
    } catch (error) {
      setSellerList([]);
    }
  }

  return (
    <div className="divTableC">
      {sellerList.length ==0 && (<button id="newF" onClick={handleNew}>Novo Funcionário</button>)}
      {sellerList.length > 0 && !editor && !newSeller && (
        
        <div className="divTableC">
          <button id="newF" onClick={handleNew}>Novo Funcionário</button>
          <table className="beforeTableC">
            <thead>
              <tr>
                <th scope="col" className="headerTableC">
                  Cpf
                </th>
                <th scope="col" className="headerTableC">
                  Nome
                </th>
                <th scope="col" className="headerTableC">
                  Data de nascimento
                </th>
                <th scope="col" className="headerTableC">
                  Comissão
                </th>
                <th scope="col" className="headerTableC"></th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table */}
              {sellerList.map((i) => {
                //itens
                return (
                  <tr>
                    <td scope="row" className="rowTable">
                      {i.sellercpf}
                    </td>{" "}
                    {/* Getting elements*/}
                    <td className="rowTable"> {i.sellername}</td>
                    <td className="rowTable">{formatDate(i.dtbirth)}</td>
                    <td className="rowTable">{i.pccommision}%</td>
                    <td>
                      <button id="rem" onClick={() => handleRemove (i.sellercpf) }>
                        Remover
                      </button>
                      <button
                        onClick={() =>
                          handleEdit(
                            i.sellername,
                            i.dtbirth,
                            i.pccommision,
                            i.sellercpf
                          )
                        }
                        className="editB"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
         
        </div>
      )}

      {editor && (
        
        <div className="divTableC">
          
          <div className="editBox">
            <h2>Altere os Dados Necessários</h2>
              
              <input
                className="inputEdit"
                type="text"
                defaultValue={sellername}
                onChange={(e) => setSellerName(e.target.value)}
              />
              <input
              className="inputEdit"
                type="text"
                defaultValue={formatDate(dtbirth)}
                onChange={(e) => setDtBirth(e.target.value)}
              />
              <input
              className="inputEdit"
                type="text"
                defaultValue={pccommision}
                onChange={(e) => setPccCommision(e.target.value)}
              />
              <button  id="saveEdit" className="inputEdit" onClick={handleSaveEdit}>Salvar</button>
              </div>
        </div>
      )}
      {newSeller && (
        <div className="divTableC">
          <div className="editBox">
            <h2>Novo Funcionário</h2>
            <input
              className="inputEdit"
              type="text"
              placeholder="CPF"
              onChange={(e) => setSellerCpf(e.target.value)}
            />
            <input
              className="inputEdit"
              type="text"
              placeholder="Nome"
              onChange={(e) => setSellerName(e.target.value)}
            />
            <input
             className="inputEdit"
              type="password"
              placeholder="Senha"
              onChange={(e) => setSellPass(e.target.value)}
            />
            <input
              id="editDate"
              className="inputEdit"
              type="date"
              placeholder="Data de nascimento"
              onChange={(e) => setDtBirth(e.target.value)}
            />
            <input
              className="inputEdit"
              type="text"
              placeholder="Comissão"
              onChange={(e) => setPccCommision(e.target.value)}
            />
            <button id="save" className="inputEdit" onClick={handleSaveNew}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CurrentSellers;
