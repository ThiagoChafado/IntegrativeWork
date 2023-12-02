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
        <div className='titleDash'>
            <h1>Dashboard Novatec</h1>
        </div>
            
        <div className='mainDash'>
                <div className="startbox">
                    <div className="box" id='box1'></div>
                    <div className="box" id='box2'></div>
                </div>


                <div className="halfmain">
                    <div className="halfbox">
                        <div className="box" id='box3'></div>
                    </div>

                    <div className="endbox">
                        <div id='boxEnd'></div>
                    </div>
                </div>
        
        </div>
        
        </>
    );
}

export default Dashboard;