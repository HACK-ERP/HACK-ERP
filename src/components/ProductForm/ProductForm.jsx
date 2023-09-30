import React, { useState } from "react";
import { createProduct } from "../../services/ProductsService";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(product)
      .then((response) => {
        console.log(response);
        navigate("/products");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ marginTop: "30px" }}>
            Crear un producto
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={product.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              name="description"
              value={product.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Imagen"
              variant="outlined"
              fullWidth
              name="image"
              value={product.image}
              onChange={handleChange}
              margin="normal"
            />
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px", marginRight: "16px" }}
              >
                Crear
              </Button>

              <Link to="/products" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "16px" }}
                >
                  Volver a la lista de productos
                </Button>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductForm;
