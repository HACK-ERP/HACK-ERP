import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

function createDate(month, amount) {
  return { month, amount };
}

const data = [
  createDate("ENE", 700),
  createDate("FEB", 300),
  createDate("MAR", 600),
  createDate("ABR", 800),
  createDate("MAY", 7500),
  createDate("JUN", 1500),
  createDate("JUL", 1500),
  createDate("AGO", 1000),
  createDate("SEP", 4000),
  createDate("OCT", 2000),
  createDate("NOV.", 3000),
  createDate("DIC.", 3000),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Ventas Mensuales
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 30,
            left: 24,
          }}
        >
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            label={{
              value: "MESES",
              position: "insideBottom",
              offset: -15,
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              IMPORTE (€)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
