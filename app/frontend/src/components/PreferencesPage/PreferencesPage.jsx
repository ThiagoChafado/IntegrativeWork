import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./stylePreferences.css";
import CurrentSeller from "../../components/CurrentSeller/CurrentSeller";

function PreferencesPage() {
  const navigate = useNavigate();
  const { shopname } = useParams();
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate(`/loginsuper/${shopname}`);
    }
  }, [navigate, shopname]);

  // mobile
  const handlesellersMobile = () => {
    navigate(`/editseller/${shopname.shopname}`);
  };

  const handlesellsMobile = () => {
    return navigate(`/editsells/${shopname.shopname}`);
  };

  const handleconfig3Mobile = () => {
    return navigate("/config3");
  };

  // demais midias
  const handlesellers = () => {
    setSelectedPage("sellers");
  };

  const handlesells = () => {
    setSelectedPage("sells");
  };

  const handleconfig3 = () => {
    setSelectedPage("config3");
  };

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case "sellers":
        return <CurrentSeller shopname={shopname} />;
      case "sells":
        // return <EditSells shopname={shopname} />;
        break;
      case "config3":
        // return <Config3 />;
        break;
      default:
        return null;
    }
  };

  return (
    <div className="divB">
      {/* mobile */}
      <div className="mainPreferencesMobile">
        <h1>CONFIGURAÇÕES GERAIS</h1>

        <button onClick={handlesellersMobile}>Editar funcionários</button>
        <button onClick={handlesellsMobile}>Editar Caixa</button>
        <button onClick={handleconfig3Mobile}>Configuração 3</button>
        {/* <button onClick={handleconfig4}>Configuração 4</button> */}
      </div>

      {/* demais midias */}
      <div className="mainPreferences">
        <h1>CONFIGURAÇÕES GERAIS</h1>

        <button onClick={handlesellers}>Funcionários</button>
        <button onClick={handlesells}>Editar Caixa</button>
        <button onClick={handleconfig3}>Configuração 3</button>
        {/* <button onClick={handleconfig4}>Configuração 4</button> */}
      </div>

      <div className="mainPreferencesR">{renderSelectedPage()}</div>
    </div>
  );
}

export default PreferencesPage;
