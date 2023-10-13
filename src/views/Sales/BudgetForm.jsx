
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OrderForm from '../../components/OrderForm/OrderForm';
import Review from '../../components/Review/Review';
import { useEffect } from 'react';
import { useState } from 'react';
import { createBudget } from '../../services/BudgetService';
import { useNavigate } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Hack-ERP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Detalles del pedido', 'Resumen del pedido'];



export default function BudgetForm() {

  const [productsToSend, setProductsToSend] = useState([]);
  const [productInput, setProductInput] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [budgetNumber, setBudgetNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [activeClient, setActiveClient] = useState({});



  const [budget, setBudget] = useState({
    "budgetNumber": "",
    "client": "",
    "products": [
      {
        "product_id": "",
        "quantity": 0
      }
    ],
    "deliveryDate": "",
    "comments": ""
  });

  useEffect(() => {
    if (budget.client && budget.deliveryDate && budget.products.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [budget]);

  const handleSubmit = (event) => {
    event.preventDefault();
    budget.budgetNumber = budgetNumber;
    createBudget(budget)
      .then(() => {
        handleNext();
      })
      .catch((error) => console.log(error));
  }

  //creando activeClient como un único objeto
  useEffect(() => {
    const activeClient = [...clients].find((client) => client.id === budget.client);
    setActiveClient(activeClient);
  }, [budget.client, clients]);
  console.log(activeClient);



  const navigate = useNavigate();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <OrderForm
          budget={budget}
          setBudget={setBudget}
          productsToSend={productsToSend}
          setProductsToSend={setProductsToSend}
          productInput={productInput}
          setProductInput={setProductInput}
          products={products}
          setProducts={setProducts}
          clients={clients}
          setClients={setClients}
          setBudgetNumber={setBudgetNumber}
        />;
      case 1:
        return <Review
          budget={budget}
          handleSubmit={handleSubmit}
          clients={clients}
          products={products}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  useEffect(() => {
    setBudget((prevBudget) => {
      return { ...prevBudget, products: productsToSend };
    });
  }, [productsToSend]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Crear un Presupuesto
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Orden de Pedido enviada
              </Typography>
              <Typography variant="subtitle1">
                La orden de pedido número <strong>{budgetNumber}</strong> ha sido enviada al correo <strong>{activeClient.Email}</strong> del cliente <strong>{activeClient.RS}</strong> con los detalles de la orden.
                El cliente deberá confirmar la orden para que se pueda proceder con la misma.
                <Button href="" onClick={() => navigate("/app/sales/budgets")} sx={{ mt: 3 }}>
                  Volver a la lista de presupuestos
                </Button>

              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"

                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={!isFormValid}
                >
                  {activeStep === steps.length - 1 ? 'Realizar Orden' : 'Ver Detalle'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
