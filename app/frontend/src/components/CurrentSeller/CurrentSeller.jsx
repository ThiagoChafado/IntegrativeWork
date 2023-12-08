import axios from "axios";
import React from "react";
import edit from "../../assets/editimg.png";
import "./styleEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../Controllers/formateDate";
axios.defaults.baseURL = "http://localhost:3001";

function CurrentSellers() {
  const [sellerList, setSellerList] = React.useState([]);
  const [editor, setEditor] = React.useState(false);
  const [sellername, setSellerName] = React.useState("");
  const [dtbirth, setDtBirth] = React.useState("");
  const [pccommision, setPccCommision] = React.useState("");
  const [sellercpf,setSellerCpf] = React.useState("");
  const navigate = useNavigate();
  const aux = useParams();
  const shopname = aux.shopname;
  React.useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate("/loginsuper");
    }
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  function handleEdit(name, birth, commision,sellercpf) {
    setSellerName(name)
    setDtBirth(formatDate(birth));
    setPccCommision(commision);
    setSellerCpf(sellercpf)
    setEditor(true);
  }

  async function handleSave(){
    try{
      const res = await axios.put(`/sellers/sellersedit`,{sellername,dtbirth,pccommision,shopname,sellercpf});
      if(res.data.update){
        console.log("Updated")
      }
    }catch(error){
      console.log(error);
    }
  }

  async function getData() {
    try {
      const res = await axios.get(`/sellers/sellers/${shopname}`);
      setSellerList(res.data);
      //return backend Object
    } catch (error) {
      setSellerList([]);
    }
  }
  return (
    <>
      {!editor && (
        <div class="container-fluid p-0">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">Cpf</th>
                <th scope="col">Nome</th>
                <th scope="col">Data de nascimento</th>
                <th scope="col">Comissão</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table */}
              {sellerList.map((i) => {
                //itens
                return (
                  <tr>
                    <th scope="row">{i.sellercpf}</th> {/* Getting elements*/}
                    <td>{i.sellername}</td>
                    <td>{formatDate(i.dtbirth)}</td>
                    <td>{i.pccommision}%</td>
                    <td>
                      <button
                        onClick={() =>
                          handleEdit(i.sellername, i.dtbirth, i.pccommision,i.sellercpf)
                        }
                        className="editButton"
                      >
                        <img src={edit} className="edit" alt="Edit icon" />
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
  <div>
    <input
      type="text"
      defaultValue={sellername}
      onChange={(e) => setSellerName(e.target.value)}
    />
     <input
      type="text"
      defaultValue={(dtbirth)}
      onChange={(e) => setDtBirth(e.target.value)}
    />
    <input
      type="text"
      defaultValue={pccommision}
      onChange={(e) => setPccCommision(e.target.value)}
    />
    <button onClick={handleSave}>SALVAR</button>
  </div>
)}

    </>
  );
}
export default CurrentSellers;
