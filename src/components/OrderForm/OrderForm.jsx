import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
'@mui/material/FormControlLabel';

import SelectInput from './SelectInput';
import { useState } from 'react';
import { useEffect } from 'react';
import {  getBudgetList } from '../../services/BudgetService';
import ProductsMultipleChoise from './ProductsMultipleChoise';
import { getProductList } from '../../services/ProductsService';
import { getClientsList } from '../../services/ClientsService';
import { TextField } from '@mui/material';


export default function OrderForm({ setBudget, productsToSend, setProductsToSend, productInput, setProductInput, products, setProducts, clients, setClients, setBudgetNumber, handleSubmit, budget }) {

  const defaultSelectedClient = clients.find((client) => client.id === budget.client);
  const [selectedClient, setSelectedClient] = useState(defaultSelectedClient?.RS ? defaultSelectedClient.RS : "");
  const defaultDeliveryDate = budget.deliveryDate;
  const [deliveryDate, setDeliveryDate] = useState(defaultDeliveryDate ? defaultDeliveryDate : "");
  const defaultComments = budget.comments;
  const [comments, setComments] = useState(defaultComments ? defaultComments : "");

  useEffect(() => {
    getProductList().then((response) => {
      setProducts(response);

    });
  }, [setProducts]);

  useEffect(() => {
    getClientsList().then((response) => {
      setClients(response);
    });
  }, [setClients]);

  useEffect(() => {
    getBudgetList().then((response) => {
      setBudgetNumber(response.length + 1);
    });
  }, [setBudgetNumber]);
    

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "client") {
      const clientSelected = clients.find((client) => client.RS === value);
      setSelectedClient(value);
      setBudget((prevBudget) => ({
        ...prevBudget,
        client: clientSelected.id,
        
      }));
    } else if (name === "deliveryDate") {
      setDeliveryDate(value);
      setBudget((prevBudget) => ({
        ...prevBudget,
        deliveryDate: value,
      }));
    } else if (name === "comments") {
      setComments(value);
      setBudget((prevBudget) => ({
        ...prevBudget,
        comments: value,
      }));
    }
  };

  const handleProductsChange = (products) => {
    setBudget((prevBudget) => {
      return { ...prevBudget, products: products };
    });
  };



  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" >
              Seleccione el cliente
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container alignItems="center">
            <SelectInput
              label="Cliente"
              value={selectedClient}
              items={clients}
              handleChange={handleChange}
              selectItem={selectedClient}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Agregue los productos
            </Typography>
            <ProductsMultipleChoise
              options={products}
              onChange={handleProductsChange}
              productsToSend={productsToSend}
              setProductsToSend={setProductsToSend}
              productInput={productInput}
              setProductInput={setProductInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
              Fecha de entrega
            </Typography>
            <TextField
              required
              type='date'
              id="deliveryDate"
              name="deliveryDate"
              label=""
              fullWidth
              autoComplete="given-name"
              value={deliveryDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="comments"
              name="comments"
              label="Comentarios"
              fullWidth
              autoComplete="given-name"
              value={comments}
              onChange={handleChange}
            />
          </Grid>
          </Grid>
      </form>
    </React.Fragment>
  );
}
