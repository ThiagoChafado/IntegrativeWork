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
        {/* <button onClick={handleSubmit}>Abrir</button> */}
        <button onClick={handleSubmit} id='EB'  type="button" class="buttonCExit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Abrir Caixa
                </button>

                {/* Modal */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Operação Realizada Com Sucesso</h1>
                        {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    <div class="modal-body">
                        Novo Caixa Aberto!
                    </div>
                    <div class="modal-footer">
                        <button id='EB' type="button" class="buttonCExit" data-bs-dismiss="modal">Fechar</button>
                    </div>
                    </div>
                </div>
                </div>


      </div>

      
    </div>
  );
}
export default OpenCash;
