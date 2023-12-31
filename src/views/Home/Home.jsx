import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";

import { OverviewBudget } from "../../components/overview/overview-budget";
import { OverviewLatestOrders } from "../../components/overview/overview-latest-orders";
import { OverviewLatestProducts } from "../../components/overview/overview-latest-products";
import { OverviewTasksProgress } from "../../components/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "../../components/overview/overview-total-customers";
import { OverviewTotalProfit } from "../../components/overview/overview-total-profit";
import Chart from "../../components/overview/Chart";
import Paper from "@mui/material/Paper";
import PieChart from "../../components/overview/PieChart";
import { useEffect, useState } from "react";
import { getOTList } from "../../services/OTService";
import { getClientsList } from "../../services/ClientsService";
import { getProductList } from "../../services/ProductsService";
import { getBudgetList } from "../../services/BudgetService";

const Page = () => {
  const [otList, setOtList] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOTList().then((response) => {
      setOtList(response);
    });
  }, []);

  useEffect(() => {
    getClientsList().then((response) => {
      setClients(response);
    });
  }, []);

  useEffect(() => {
    getProductList().then((response) => {
      setProducts(response);
    });
  }, []);

  useEffect(() => {
    getBudgetList().then((response) => {
      setBudgets(response);
      setLoading(false);
    });
  }, []);

  const otsToShow = otList.slice(0, 6);

  const getOTClient = (id) => {
    const client = clients.find((client) => client.id === id);
    return client.RS;
  };

  const calculateTotalSales = (otList, products) => {
    let totalSales = 0;

    otList.forEach((ot) => {
      const budget = ot.budget;
      budget.products?.forEach((budgetProduct) => {
        const product = products.find((p) => p.id === budgetProduct.product_id);
        if (product) {
          const sales = product.price * budgetProduct.quantity;
          totalSales += sales;
        }
      });
    });

    return totalSales;
  };

  const calculateTotalClients = (clients) => {
    return clients.length;
  };

  const calculateTotalBudgetsDelivered = (budgets) => {
    if (loading) return 0;

    let totalBudgetsDelivered = 0;

    budgets.forEach((budget) => {
      if (budget.status === "Entregado") {
        totalBudgetsDelivered++;
      }
    });

    return (totalBudgetsDelivered = Math.round(
      (totalBudgetsDelivered * 100) / budgets.length
    ));
  };

  /*   const calculateTotalOffers = (otList, products) => {
    let totalOffers = 0;
  
    otList.forEach((ot) => {
      const budget = ot.budget;
      budget.products.forEach((budgetProduct) => {
        const product = products.find((p) => p.id === budgetProduct.product_id);
        if (product) {
          const offers = product.price * budgetProduct.quantity;
          totalOffers += offers;
        }
      });
    });
  
    return totalOffers;
  }; */

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          maxWidth: { md: "calc(100vw - 64px)" },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                sx={{ height: "100%" }}
                value={`${calculateTotalSales(otList, products) / 1000}K €`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                sx={{ height: "100%" }}
                value={`${calculateTotalClients(clients)} Clientes`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress
                sx={{ height: "100%" }}
                value={`${calculateTotalBudgetsDelivered(budgets)}`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="150K €" />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: 500,
                  width: "100%",
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  height: 500,
                  width: "100%",
                }}
              >
                <PieChart />
              </Paper>
            </Grid>
            <Grid xs={12} md={12} lg={4}>
              <OverviewLatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={otsToShow}
                sx={{ height: "100%" }}
                getOTClient={getOTClient}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
