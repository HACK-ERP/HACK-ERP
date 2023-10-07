import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

/* eslint-disable react/prop-types */
const ProductCard = ({ product, onDelete, nameFontSize }) => {
  const { id, name, description, image } = product;

  const priceCalc = (product) => {
    const totalPrice = product.materials.reduce((acc, material) => {
      return acc + Number(material.material_id.price) * Number(material.quantity);
    }, 0);
    return totalPrice; 
  }

  return (
    <Card sx={{ border: "1px solid #e0e0e0" }}>
      <Link to={`/products/${id}`}>
        <CardMedia component="img" alt={name} height="200" image={image} />
      </Link>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ fontSize: nameFontSize, fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <Box mt={2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Precio: <span className="fw-bold">{priceCalc(product)} € </span>
          </Typography>
        </Box>
        <Button
          component={Link}
          to={`/products/${id}`}
          variant="contained"
          color="primary"
          size="small"
          sx={{ mr: 1, mt: 2 }}
        >
          Detalle
        </Button>
        <Button
          component={Link}
          to={`/products/${id}/edit`}
          variant="contained"
          color="warning"
          size="small"
          sx={{ mr: 1, mt: 2 }}
        >
          Editar
        </Button>
        <Button
          onClick={() => onDelete(id)}
          variant="contained"
          color="error"
          size="small"
          sx={{ mt: 2 }}
        >
          Eliminar
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
