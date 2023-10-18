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

const Page = () => {
  const [otList, setOtList] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getOTList().then((response) => {
      //ordendando las ot por fecha y limitando a 6
      response.sort((a, b) => new Date(a.date) - new Date(b.date));
      response = response.slice(0, 6);
      setOtList(response);
    });
  }, []);

  useEffect(() => {
    getClientsList().then((response) => {
      setClients(response);
    });
  }, []);

  console.log("otList", otList);

  const getOTClient = (id) => {
    const client = clients.find((client) => client.id === id);
    return client.RS;
  }

  //pintando en consola las ots
  console.log("otList", otList);
  


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
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="24k €"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={50} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="15k €" />
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
              orders={otList}
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
