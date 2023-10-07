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
import { getMaterialDetail } from "../../services/Materials";

const MaterialDetails = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMaterialDetail(id)
      .then((material) => {
        setMaterial(material);
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

  if (!material) {
    return <Typography>Material not found</Typography>;
  }

  const { name, description, image, price, stock } = material;

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
        Detalle del material
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
            <Typography variant="h7">Precio: {price} €</Typography><br />
            <Typography variant="h6">Cantidad: {stock} und</Typography><br />
            
            <Link to="/materials" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Volver a la lista de materiales
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MaterialDetails;
