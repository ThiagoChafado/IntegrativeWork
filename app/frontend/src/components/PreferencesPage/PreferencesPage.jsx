import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./stylePreferences.css";
import CurrentSeller from "../../components/CurrentSeller/CurrentSeller";
import Calculator from "../Calculator/Calculator";

function PreferencesPage() {
  const navigate = useNavigate();
  const aux = useParams();
  const shopname = aux.shopname;
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("tokensuper")) {
      navigate(`/loginsuper/${shopname}`);
    }
  }, [navigate, shopname]);

  // mobile
  const handlesellersMobile = () => {
    navigate(`/editseller/${shopname}`);
  };

  const handlesellsMobile = () => {
    return navigate(`/editsells/${shopname}`);
  };

  const handleCalculatorMobile = () => {
    return navigate("/calculator");
  };

  // demais midias
  const handlesellers = () => {
    setSelectedPage("sellers");
  };

  const handlesells = () => {
    setSelectedPage("sells");
  };

  const handleCalculator = () => {
    setSelectedPage("calculator");
  };

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case "sellers":
        return <CurrentSeller shopname={shopname} />;
      case "sells":
        // return <EditSells shopname={shopname} />;
        break;
      case "calculator":
         return <Calculator shopname={shopname} />;
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
        <button onClick={handleCalculator}>Calculadora de comissões</button>
        {/* <button onClick={handleconfig4}>Configuração 4</button> */}
      </div>

      {/* demais midias */}
      <div className="mainPreferences">
        <h1>CONFIGURAÇÕES GERAIS</h1>

        <button onClick={handlesellers}>Funcionários</button>
        <button onClick={handleCalculator}>Calculadora de comissões</button>
        {/* <button onClick={handleconfig4}>Configuração 4</button> */}
      </div>

      <div className="mainPreferencesR">{renderSelectedPage()}</div>
    </div>
  );
}

export default PreferencesPage;
