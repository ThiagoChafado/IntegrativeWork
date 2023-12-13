import React, { useEffect } from "react";
import "./styleDash.css";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import axios from "axios";
import defaultMonth from "../Controllers/defaultMonth";
axios.defaults.baseURL = "http://localhost:3001";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = React.useState();
  const [sellerList, setSellerList] = React.useState();
  const [selectedMonth, setSelectedMonth] = React.useState();
  const aux = useParams();
  const shopname = aux.shopname;

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  React.useEffect(() => {
    defaultYear();
    getDefaultMonth();
  }, []);

  React.useEffect(() => {
    if (selectedYear != undefined) {
      getFirstDashboard();
    }
  }, [selectedYear]);

  React.useEffect(() => {
    if (selectedMonth != undefined) {
      getSecondDashboard();
    }
  }, [selectedMonth]);

  function getDefaultMonth() {
    const pcMonth = defaultMonth();
    setSelectedMonth(pcMonth);
  }

  function defaultYear() {
    const pcDate = new Date();
    const newYear = pcDate.getFullYear();
    setSelectedYear(newYear);
  }

  async function getSecondDashboard() {
    const res = await axios.get(
      "/sellers/sellersells/" + shopname + "/" + selectedMonth
    );
    setSellerList(res.data);
  }

  async function getFirstDashboard() {
    const month = [];
    for (let i = 1; i <= 12; i++) {
      const res = await axios.get(
        "/sales/sums/" + selectedYear + "/" + i + "/" + shopname
      );
      const count = res.data.sum;
      month.push(count);
    }

    const data = [
      { year: "Janeiro", count: month[0] },
      { year: "Fevereiro", count: month[1] },
      { year: "Março", count: month[2] },
      { year: "Abril", count: month[3] },
      { year: "Maio", count: month[4] },
      { year: "Junho", count: month[5] },
      { year: "Julho", count: month[6] },
      { year: "Agosto", count: month[7] },
      { year: "Setembro", count: month[8] },
      { year: "Outubro", count: month[9] },
      { year: "Novembro", count: month[10] },
      { year: "Dezembro", count: month[11] },
    ];

    const existingChart = Chart.getChart("dash1");
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = document.getElementById("dash1").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Valor por mês($)",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  }

  return (
    <>
      <div className="titleDash">
        <h1>Dashboard {shopname}</h1>
      </div>
      <div className="dashYear">
        <h2>Selecione o Ano</h2>
        <input
          type="number"
          id="yearInput"
          name="yearInput"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.currentTarget.value)}
          placeholder="Informe o ano"
          min="1900"
          max="2100"
        />
      </div>

      <div className="mainDash">
          <div className="box" id="box1">
              <h3>Vendas</h3>
              <canvas id="dash1"></canvas>
            
          </div>
          <div className="box" id="box2">
              <h3>Feedback</h3>
              <input
                type="month"
                id="monthInput"
                name="monthInput"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.currentTarget.value)}
              ></input>
              {sellerList &&
                sellerList.map((i) => {
                  return (
                    <div className="sellerDash">
                      <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
  <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg> 
Vendedor: {i.sellername} <br /> 

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
  <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
</svg>
Total No Mês: R${i.sum}</p>
                      
                    </div>
                  );
                })}
          </div>
      </div>
    </>
  );
}

export default Dashboard;
