
import logo from "../../assets/logoNovatecNoBackground.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function LoginSeller() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   async function handleSubmit() {
    try {
      const res = await axios.post("/auth/login", { username, password });
      if (res.data.auth) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/selectshop");
      }
    } catch (error) {
      console.log(error);
      window.alert('Acesso Inválido. Verifique Usuário e Senha')
    }
  }

  return (
    <>
      <div className="mainLogin">
        <img src={logo} alt="Logo" />
        <div className="center">
          <div className="card">
            <h1>LOGIN</h1>
            <div className="text">
              <label htmlFor="user">Usuário</label>
              <input
                type="text"
                className="btnuser"
                onChange={(e) => setUsername(e.currentTarget.value)}
                placeholder="Usuário"
              />
            </div>

            <div className="text">
              <label htmlFor="pass">Senha</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Senha"
              />
            </div>

            <button onClick={handleSubmit} className="loginB">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSeller;
