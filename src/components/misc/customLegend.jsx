// Desc: Custom legend for the chart

const CustomLegend = ({ data }) => (
    <div className="legend">
      {data.map((item, index) => (
        <div key={index} className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: item.color }}
          />
          <div className="legend-label">{item.title}</div>
        </div>
      ))}
    </div>
  );

export default CustomLegend;