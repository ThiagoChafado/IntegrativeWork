import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./stylePreferences.css";
import CurrentSeller from "../../components/CurrentSeller/CurrentSeller";
import Calculator from "../Calculator/Calculator";
import RemoveSell from "../RemoveSell/RemoveSell";
import CloseCash from "../CloseCash/CloseCash";

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

  const handlesellsMobile = () => {
    return navigate(`/editsells/${shopname}`);
  };

  const handleCalculatorMobile = () => {
    return navigate(`/calcPage/${shopname}`);
  };

  const handleRemoveSellMobile = () => {
    return navigate(`/removeSell/${shopname}`);
  };

  const handleCloseCashMobile = () => {
    return navigate(`/closecash/${shopname}`);
  };

  // demais midias
  const handlesellers = () => {
    setSelectedPage("sellers");
  };

  const handleCalculator = () => {
    setSelectedPage("calculator");
  };

  const handleRemoveSell = () => {
    setSelectedPage("removesell");
  };


  const handleCloseCash = () =>{
    setSelectedPage("close");
  }

  const renderSelectedPage = () => {
    switch (selectedPage) {
      case "sellers":
        return <CurrentSeller shopname={shopname} />;
        break;
      case "calculator":
        return <Calculator shopname={shopname} />;
        break;
      case "removesell":
        return <RemoveSell shopname={shopname} />;
        break;
      case "close":
        return <CloseCash shopname={shopname}/>
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
        <button onClick={handlesellersMobile}>Funcionários</button>
        <button onClick={handleCalculatorMobile}>
          Calculadora de comissões
        </button>
        <button onClick={handleRemoveSellMobile}>Remover venda</button>
        <button onClick={handleCloseCashMobile}>Fechar caixa</button>
      </div>

      {/* demais midias */}
      <div className="mainPreferences">
        <h1>CONFIGURAÇÕES GERAIS</h1>
        <button onClick={handlesellers}>Funcionários</button>
        <button onClick={handleCalculator}>Calculadora de comissões</button>
        <button onClick={handleRemoveSell}>Remover venda</button>
        <button onClick={handleCloseCash}>Fechar caixa</button>
        <a id="back" href="">
          Voltar
        </a>
      </div>

      <div className="mainPreferencesR">{renderSelectedPage()}</div>
    </div>
  );
}

export default PreferencesPage;
