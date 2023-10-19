import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Avatar, ListItemAvatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Paper from '@mui/material/Paper';

export default function Review({ budget, products, clients }) {

  const productsToShow = [...products].filter((product) => {
    return budget.products.map((productBudget) => productBudget.product_id).includes(product.id);
  });


  const calculateTotalPrice = (budget) => {
    const { products } = budget;
    let totalPrice = 0;

    for (const productData of products) {
      const product = productsToShow.find((p) => p.id === productData.product_id);
      if (product) {
        totalPrice += product.price * parseInt(productData.quantity, 10);
      }
    }


    return totalPrice;
  };

  //client to sow como objeto

  const clientToShow = [...clients].find((client) => client.id === budget.client);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de la orden
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio unitario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsToShow.map((product) => {
              const productData = budget.products.find((p) => p.product_id === product.id);
              const quantity = productData ? productData.quantity : 0;

              return (
                <TableRow key={product.name}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{calculateTotalPrice(budget)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>


      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Dirección de envío
          </Typography>
          <Typography gutterBottom>{clientToShow.Address}</Typography>



          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles de Contacto
          </Typography>
          <Grid container>
            {/* Mostrar los datos en vertical  */}
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={clientToShow.RS} secondary={clientToShow.NIF} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <TravelExploreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={clientToShow.Address} secondary={clientToShow.City} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PermContactCalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={clientToShow.Email} secondary={clientToShow.Phone} />
              </ListItem>
            </List>
            <Grid container spacing={2} sx={{pl:3}}>
              <Grid sx={{ mt: 2 }} >
          
                  <Typography variant="h6" >
                    Fecha de Entrega
                  </Typography>
                  <Typography >{budget.deliveryDate}</Typography>

              </Grid>
              <Grid sx={{ mt: 2 }} >

                  <Typography variant="h6" >
                    Comentarios
                  </Typography>
                  <Typography >{budget.comments}</Typography>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}