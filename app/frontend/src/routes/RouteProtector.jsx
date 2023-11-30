// ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// ...


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ...


const RouteProtector = ({ path, element }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Faça uma chamada ao backend para verificar a validade do token
        const verify = await axios.get("/verifyToken");
        if(verify.data.valid==true){
            navigate("/login/preferences");
        }
        // Se o token for válido, continue renderizando o componente da rota protegida
      } catch (error) {
        // Se houver um erro ao verificar o token, redirecione para a página de login
        console.error("Error on verify token:", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate, path]);

  return element;
};

export default RouteProtector;
