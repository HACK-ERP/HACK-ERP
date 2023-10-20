import { useEffect, useState } from "react";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import "../../assets/css/PieChart.css";
import { getBudgetList } from "../../services/BudgetService";

const data = [
  { budget: "Enviado", area: 0 },
  { budget: "Aceptado", area: 0 },
  { budget: "Rechazado", area: 0 },
  { budget: "Entregado", area: 0 }
];

const PieChart = () => {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBudgetList()
      .then((response) => {
        setBudgetList(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  budgetList.forEach((budget) => {
    if (budget.status === "Enviado") {
      data[0].area += 1;
    } else if (budget.status === "Aceptado") {
      data[1].area += 1;
    } else if (budget.status === "Rechazado") {
      data[2].area += 1;
    } else if (budget.status === "Entregado") {
      data[3].area += 1;
    }
  });

  return (
    <div className="pie-chart-container">
      <Chart data={data}>
        <PieSeries valueField="area" argumentField="budget" />
        <Title text="Estado de Presupuestos" />
        <Animation />
        <Legend position="bottom" />
      </Chart>
    </div>
  );
};

export default PieChart;
