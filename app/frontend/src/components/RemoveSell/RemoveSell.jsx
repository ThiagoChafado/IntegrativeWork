import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import './styleRemove.css'

axios.defaults.baseURL = "http://localhost:3001";

function RemoveSell() {
  const [selectedId, setSelectedId] = React.useState("");
  const navigate = useNavigate();
  const aux = useParams();
  const shopname = aux.shopname;
  
  
  React.useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate("/loginsuper");
    }
  }, []);

  async function handleRemoveSell(){
    try{
        
        const res = await axios.delete(`/sales/selldelete/${shopname}/${selectedId}`);
        if(res.data.deleted){
            window.alert("Deletado");
        }
    }catch(error){
        console.log(error);
        window.alert("ID inválido")
    }
  }

  return (
    <div className="removeS" >
      <h1>Excluir Venda</h1>
      <input
        className="inputRemove"
        placeholder="Digite o ID da venda "
        type="number"
        onChange={(e) => setSelectedId(e.currentTarget.value)}
      ></input>
      <button  id="removeB" className="inputRemove" onClick={handleRemoveSell}>Remover</button>
    </div>
  );
}
export default RemoveSell;
