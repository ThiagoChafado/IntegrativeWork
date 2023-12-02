import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout (){
    const navigate = useNavigate();
    localStorage.getItem("token")

    return;
}
export default Logout;