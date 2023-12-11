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
        <h1>Dashboard Novatec</h1>
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
        <div className="startbox">
          <div className="box" id="box1">
            <div>
              <canvas id="dash1"></canvas>
            </div>
          </div>
          <div className="box" id="box2">
            <div>
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
                    <div>
                      <p>VENDEDOR:{i.sellername} | TOTAL NO MÊS: R${i.sum}</p>
                      
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="halfmain">
          <div className="halfbox">
            <div className="box" id="box3"></div>
          </div>

          <div className="endbox">
            <div id="boxEnd"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
