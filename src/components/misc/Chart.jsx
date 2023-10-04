import Loadable from "react-loadable";

const LoadableApexChart = Loadable({
  loader: () => import("react-apexcharts"),
  loading: () => null,
});

const Chart = (props) => <LoadableApexChart {...props} />;

export default Chart;
