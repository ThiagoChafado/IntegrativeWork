import './styleExit.css'
import { useNavigate } from "react-router-dom";
import React from 'react';
function AddExit(){
    const navigate = useNavigate();

    React.useEffect(()=>{
        if (!localStorage.getItem("token")){
            navigate("/");
        }
    },[navigate])
    return(
        <>
            <div className='containerExit'>
                <div className="titleExit">
                    <h1>Adicionar Saída</h1>
                </div>

                <div className='descriptionExit'>
                    <label htmlFor="description">Descrição</label>
                    <input type="text" placeholder='Digite aqui...'/>
                </div>

                <div className='valuesExit'>
                    <input type="data" placeholder='Data'/>
                    <input type="text" placeholder='Valor'/>
                </div>

                <div className='buttonCExit'>
                    <button>Adicionar</button>
                </div>
            </div>
        
        </>
    );
}

export default AddExit;