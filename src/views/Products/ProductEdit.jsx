import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProductDetail, updateProduct } from "../../services/ProductsService";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetail(id)
      .then((product) => {
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("ENTRA HANDLE")
    updateProduct(id, product)
      .then(() => {
        console.log("entra por aqui")
        navigate("/products");
      })
      .catch((error) => {
        console.log("ENTRA AL CATCH")
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const { name, description, image, price } = product;

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            gutterBottom
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            Editar Producto
          </Typography>
          <Grid item xs={12} sm={7}>
            <form onSubmit={handleUpdate}>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Nombre"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Descripción"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Precio"
                  id="price"
                  name="price"
                  type="number"
                  value={price}
                  onChange={handleChange}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="URL de la imagen"
                  id="image"
                  name="image"
                  value={image}
                  onChange={handleChange}
                />
              </Box>
              <Button  type="submit" variant="contained" color="primary">
                Editar Producto
              </Button>
              <Link
                to="/products"
                style={{ textDecoration: "none", marginLeft: "8px" }}
                variant="contained"
                color="primary"
              >
                Volver a la lista de productos
              </Link>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductEdit;
