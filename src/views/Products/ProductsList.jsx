import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProductList, deleteProduct } from "../../services/ProductsService";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductList()
      .then((response) => {
        const sortedProducts = response.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!products.length) {
    return <h1>No hay productos</h1>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
        Productos
      </Typography>
      <Button
        component={Link}
        to="/products/create"
        variant="contained"
        color="primary"
        sx={{ marginBottom: 3 }}
      >
        Crear Producto
      </Button>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              product={product}
              onDelete={handleDeleteProduct}
              nameFontSize="17px"
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Product;
