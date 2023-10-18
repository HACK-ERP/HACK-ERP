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
import { useEffect, useState } from "react";
import { getBudgetList } from "../../services/BudgetService";

let data = [
  {
    month: "ENE",
    amount: 0,
  },
  {
    month: "FEB",
    amount: 0,
  },
  {
    month: "MAR",
    amount: 0,
  },
  {
    month: "ABR",
    amount: 0,
  },
  {
    month: "MAY",
    amount: 0,
  },
  {
    month: "JUN",
    amount: 0,
  },
  {
    month: "JUL",
    amount: 0,
  },
  {
    month: "AGO",
    amount: 0,
  },
  {
    month: "SEP",
    amount: 0,
  },
  {
    month: "OCT",
    amount: 0,
  },
  {
    month: "NOV",
    amount: 0,
  },
  {
    month: "DIC",
    amount: 0,
  },
];

export default function Chart() {
  const theme = useTheme();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBudgetList()
      .then((budgets) => {
        setBudgets(budgets);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const acceptedBudgets = budgets.filter((budget) => {
    return budget.status === "Aceptado";
  });

  const totals = acceptedBudgets.map((budget) => {
    return {
      amount: budget.products.reduce((acc, product) => {
        return (
          acc + Number(product.product_id.price) * Number(product.quantity)
        );
      }, 0),
      month: convertMonth(budget.deliveryDate.slice(5, 7)),
    };
  });

  const monthlyData = data.map((month) => {
    const total = totals.reduce((acc, total) => {
      if (total.month === month.month) {
        return acc + total.amount;
      } else {
        return acc;
      }
    }, 0);
    return {
      month: month.month,
      amount: total,
    };
  });

  const chartData = [...monthlyData];

  function convertMonth(month) {
    switch (month) {
      case "01":
        return "ENE";
      case "02":
        return "FEB";
      case "03":
        return "MAR";
      case "04":
        return "ABR";
      case "05":
        return "MAY";
      case "06":
        return "JUN";
      case "07":
        return "JUL";
      case "08":
        return "AGO";
      case "09":
        return "SEP";
      case "10":
        return "OCT";
      case "11":
        return "NOV";
      case "12":
        return "DIC";
    }
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!budgets) {
    return <Typography>Material not found</Typography>;
  }

  return (
    <React.Fragment>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Ventas Mensuales
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
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
