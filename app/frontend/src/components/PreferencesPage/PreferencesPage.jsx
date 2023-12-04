import { useNavigate,useParams } from "react-router-dom";
import "./stylePreferences.css";
import React from "react";

function PreferencesPage() {
  const navigate = useNavigate();
  const shopname = useParams();

  React.useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate(`/loginsuper/:${shopname.shopname}`);
    }
  });

  const handlesellers = () => {
    return navigate(`/editseller/${shopname.shopname}`);
  };
  const handlesells = () => {
    return navigate(`/editsells/${shopname.shopname}`);
  };
  const handleclose = () => {
    return navigate(`/closecash/${shopname.shopname}`);
  };
  const handleconfig4 = () => {
    return navigate("/config4");
  };
  return (
    <>
      <div className="mainPreferences">
        <h1>CONFIGURAÇÕES GERAIS</h1>

        <button onClick={handlesellers}>Editar funcionários</button>
        <button onClick={handlesells}>Editar Caixa</button>
        <button onClick={handleclose}>Fechar caixa</button>
        <button onClick={handleconfig4}>Configuração 4</button>
      </div>
    </>
  );
}

export default PreferencesPage;
