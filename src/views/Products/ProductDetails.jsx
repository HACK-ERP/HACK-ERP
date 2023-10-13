import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Box,
} from "@mui/material";
import { getProductDetail } from "../../services/ProductsService";

const ProductDetails = () => {
  const { id } = useParams();
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

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const { name, description, image, price } = product;

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
        Detalle del producto
      </Typography>
      <Box mt={4}>
        <Card sx={{ maxWidth: "50%" }}>
          {" "}
          <CardMedia component="img" alt={name} height="250" image={image} />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" paragraph>
              {description}
            </Typography>
            <Typography variant="h6">Precio: {price} €</Typography>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Volver a la lista de productos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductDetails;
