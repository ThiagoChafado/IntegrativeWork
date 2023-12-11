import "./style.css";
import logo from "../../assets/logoNovatecNoBackground.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function LoginSuper() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const shopname = useParams();

  async function handleSubmit() {
    try {
      const res = await axios.post("/auth/loginsuper", { username, password });
      if (res.data.auth) {
        const token = res.data.token;
        localStorage.setItem("tokensuper", token);
        navigate(`/preferences/${shopname.shopname}`);
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

export default LoginSuper;
