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
      navigate("");
    }
  }, [navigate, shopname]);

  // mobile
  const handlesellersMobile = () => {
    navigate(`/editseller/${shopname}`);
  };

  const handleCalculatorMobile = () => {
    return navigate(`/calcPage/${shopname}`);
  };

  // demais midias
  const handlesellers = () => {
    setSelectedPage("sellers");
  };

  const handleCalculator = () => {
    setSelectedPage("calculator");
  };

  const handleBack = () => {
    setSelectedPage("back");
  };

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case "sellers":
        return <CurrentSeller shopname={shopname} />;
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
        <button onClick={handleCalculatorMobile}>Calculadora de comissões</button>

      </div>

      {/* demais midias */}
      <div className="mainPreferences">
        <h1>CONFIGURAÇÕES GERAIS</h1>
        <button onClick={handlesellers}>Funcionários</button>
        <button onClick={handleCalculator}>Calculadora de comissões</button>
        <a id="back" href="">Voltar</a>
      </div>

      <div className="mainPreferencesR">{renderSelectedPage()}</div>
    </div>
  );
}

export default PreferencesPage;
