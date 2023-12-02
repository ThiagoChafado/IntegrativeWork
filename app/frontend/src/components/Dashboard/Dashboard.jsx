import React from 'react';
import './styleDash.css'
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();

    React.useEffect(()=>{
        if (!localStorage.getItem("token")){
            navigate("/")
        }
    })

    return(
        <>
            <div className="mainDash">
                <h1>Dashboard Novatec</h1>

                <div className="rowBox">
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
                
            </div>
        
        </>
    );
}

export default Dashboard;