import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewBudget } from "../../components/overview/overview-budget";
import { OverviewLatestOrders } from "../../components/overview/overview-latest-orders";
import { OverviewLatestProducts } from "../../components/overview/overview-latest-products";
import { OverviewTasksProgress } from "../../components/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "../../components/overview/overview-total-customers";
import { OverviewTotalProfit } from "../../components/overview/overview-total-profit";

const Page = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: "100%" }}
              value="$24k"
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
            <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewLatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid xs={12} md={12} lg={8}>
            <OverviewLatestOrders
              orders={[
                {
                  id: "f69f88012978187a6c12897f",
                  ref: "DEV1049",
                  amount: 30.5,
                  customer: {
                    name: "Ekaterina Tankova",
                  },
                  createdAt: 1555016400000,
                  status: "pending",
                },
                {
                  id: "9eaa1c7dd4433f413c308ce2",
                  ref: "DEV1048",
                  amount: 25.1,
                  customer: {
                    name: "Cao Yu",
                  },
                  createdAt: 1555016400000,
                  status: "delivered",
                },
                {
                  id: "01a5230c811bd04996ce7c13",
                  ref: "DEV1047",
                  amount: 10.99,
                  customer: {
                    name: "Alexa Richardson",
                  },
                  createdAt: 1554930000000,
                  status: "refunded",
                },
                {
                  id: "1f4e1bd0a87cea23cdb83d18",
                  ref: "DEV1046",
                  amount: 96.43,
                  customer: {
                    name: "Anje Keizer",
                  },
                  createdAt: 1554757200000,
                  status: "pending",
                },
                {
                  id: "9f974f239d29ede969367103",
                  ref: "DEV1045",
                  amount: 32.54,
                  customer: {
                    name: "Clarke Gillebert",
                  },
                  createdAt: 1554670800000,
                  status: "delivered",
                },
                {
                  id: "ffc83c1560ec2f66a1c05596",
                  ref: "DEV1044",
                  amount: 16.76,
                  customer: {
                    name: "Adam Denisov",
                  },
                  createdAt: 1554670800000,
                  status: "delivered",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Page;

// import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
// import Paper from '@mui/material/Paper';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
// import AddressForm from '../../components/AddressForm/AddressForm';
// import PaymentForm from '../../components/PaymentForm/PaymentForm';
// import Review from '../../components/Review/Review';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Hack-ERP
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

// export default function Checkout() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <AppBar
//         position="absolute"
//         color="default"
//         elevation={0}
//         sx={{
//           position: 'relative',
//           borderBottom: (t) => `1px solid ${t.palette.divider}`,
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" color="inherit" noWrap>
//             Company name
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
//         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//           <Typography component="h1" variant="h4" align="center">
//             Checkout
//           </Typography>
//           <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           {activeStep === steps.length ? (
//             <React.Fragment>
//               <Typography variant="h5" gutterBottom>
//                 Thank you for your order.
//               </Typography>
//               <Typography variant="subtitle1">
//                 Your order number is #2001539. We have emailed your order
//                 confirmation, and will send you an update when your order has
//                 shipped.
//               </Typography>
//             </React.Fragment>
//           ) : (
//             <React.Fragment>
//               {getStepContent(activeStep)}
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 {activeStep !== 0 && (
//                   <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
//                     Back
//                   </Button>
//                 )}

//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   sx={{ mt: 3, ml: 1 }}
//                 >
//                   {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
//                 </Button>
//               </Box>
//             </React.Fragment>
//           )}
//         </Paper>
//         <Copyright />
//       </Container>
//     </React.Fragment>
//   );
// }
