import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Avatar, Container, ListItemAvatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getBudgetDetail } from '../../services/BudgetService';
import { useParams } from 'react-router';
import { getProductList } from '../../services/ProductsService';
import { getClientsList } from '../../services/ClientsService';

export default function BudgetDetail() {
  const [budget, setBudget] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      getBudgetDetail(id),
      getProductList(),
      getClientsList()
    ])
      .then(([budgetResponse, productsResponse]) => {
        setBudget(budgetResponse);
        setProducts(productsResponse);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  const calculateTotalPrice = (budget) => {
    let totalPrice = 0;
  
    for (const productData of budget.products) {
      const product = productData.product_id;
      const quantity = productData.quantity || 0;
  
      totalPrice += product.price * quantity;
    }
  
    return totalPrice;
  };

  //dar formato a la fecha
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <div>Cargando...</div>;
  } else {
    
    return (
      <Container component="main" maxWidth="md" sx={{ my: 4 }}>
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
              <TableCell align="right">Precio Parcial</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {budget.products.map((productData) => {
        const product = productData.product_id;
        const quantity = productData.quantity || 0;

        return (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell align="right">{quantity}</TableCell>
            <TableCell align="right">{product.price}</TableCell>
            <TableCell align="right">{product.price*quantity}</TableCell>
          </TableRow>
        );
      })}
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">
                {calculateTotalPrice(budget, products)
                  
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Dirección de envío
          </Typography>
          <Typography gutterBottom>{budget.client.Address}</Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles de Contacto
          </Typography>
          <Grid container>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={budget.client.RS} secondary={budget.client.NIF} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <TravelExploreIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={budget.client.Address} secondary={budget.client.City} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PermContactCalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={budget.client.Email} secondary={budget.client.Phone} />
              </ListItem>
            </List>
            <Grid container spacing={2} sx={{ pl: 3 }}>
              <Grid sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Fecha de Entrega
                </Typography>
                <Typography>{formatDate(budget.deliveryDate)}</Typography>
              </Grid>
              <Grid sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Comentarios
                </Typography>
                <Typography>{budget.comments}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    
    );
  }
}