import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
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
    <div>
      <p>Abrir caixa</p>
      <>Digite o valor inicial</>
      <input
        type="number"
        className="inputChange"
        onChange={(e) => setChange(e.currentTarget.value)}
        placeholder="Início:"
      />
      <p></p>
      <button onClick={handleSubmit}>Abrir</button>
    </div>
  );
}
export default OpenCash;
