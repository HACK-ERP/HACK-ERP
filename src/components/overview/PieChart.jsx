import * as React from "react";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import "../../assets/css/PieChart.css"

const data = [
  { product: "Producto1", area: 40 },
  { product: "Producto2", area: 20 },
  { product: "Producto3", area: 30 },
];

export default class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
        <div className="pie-chart-container">
        <Chart data={chartData}>
          <PieSeries valueField="area" argumentField="product" />
          <Title text="Productos Vendidos" />
          <Animation />
          <Legend position="bottom" />
        </Chart>
      </div>
    );
  }
}
