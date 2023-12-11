import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import './styleOpen.css'

axios.defaults.baseURL = "http://localhost:3001";

function OpenCash() {
  const param = useParams();
  const date = param.date;
  const shopname = param.shopname;
  const navigate = useNavigate();
  const [change, setChange] = React.useState();
  const [open,setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  async function handleSubmit() {
    try{
        
        const res = await axios.post("/cash/opencash",{date,shopname,change});
        console.log(res);
        if(res.data.check){
            setOpen(true);
            return (
                navigate (`/addsale/${shopname}`))
        }
    }catch(error){
        console.log(error);
    }
  }
  return (
    <div className="openCash">
      <h1>Abrir caixa</h1>
      <h2>Digite o valor inicial</h2>

      <div className="inputOpen">
      <input
        type="number"
        className="inputChange"
        onChange={(e) => setChange(e.currentTarget.value)}
        placeholder="Início:"
      />
      </div>

      <div className="buttonOpen">
        <button onClick={handleSubmit}>Abrir</button>
      </div>

      
    </div>
  );
}
export default OpenCash;
