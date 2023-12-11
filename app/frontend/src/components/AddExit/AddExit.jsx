import './styleExit.css'
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';
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

                <button id='EB'  type="button" class="buttonCExit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Adicionar
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
                        Saída Adicionada!
                    </div>
                    <div class="modal-footer">
                        <button id='EB' type="button" class="buttonCExit" data-bs-dismiss="modal">Fechar</button>
                        <button id='EB' type="button" class="buttonCExit">Salvar</button>
                    </div>
                    </div>
                </div>
                </div>
                

            </div>
        
        </>
    );
}

export default AddExit;