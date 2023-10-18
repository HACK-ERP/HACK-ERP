import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Box,
} from "@mui/material";
import { getOTDetail } from "../../services/OTService";
import { getProductList } from "../../services/ProductsService";

const OTDetails = () => {
  const { id } = useParams();
  const [ot, setOT] = useState({});
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOTDetail(id)
      .then((ot) => {
        setOT(ot);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getProductList().then((response) => {
      setProducts(response);
    });
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!ot) {
    return <Typography>OT not found</Typography>;
  }

  function changeDate(dateISO) {
    const date = new Date(dateISO);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const dayStr = day.toString().padStart(2, "0");
    const monthStr = month.toString().padStart(2, "0");

    const newDate = `${dayStr}/${monthStr}/${year}`;

    return newDate;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
        Detalle de la OT
      </Typography>
      <Box mt={4}>
        <Card sx={{ maxWidth: "50%" }}>
          {" "}
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <strong>Código: </strong>
              {ot.code}
            </Typography>
            <Typography variant="h6" paragraph>
              <strong>Estado: </strong>
              {ot.status}
            </Typography>
            <Typography variant="h6" paragraph>
              <strong>Fecha de entrega: </strong>
              {changeDate(ot.budget.deliveryDate)}
            </Typography>
            <Typography variant="h6" paragraph>
              <strong>Productos:</strong>
              <ul>
                {ot.budget.products.map((otProduct, index) => {
                  const matchingProduct = products.find(
                    (product) => product.id === otProduct.product_id
                  );
                  return (
                    <li key={index}>
                      {matchingProduct
                        ? matchingProduct.name
                        : "Producto no encontrado"}
                      <ul>
                        {matchingProduct && matchingProduct.materials && (
                          <li>
                            <strong>Materiales:</strong>
                            <ul>
                              {matchingProduct.materials.map(
                                (material, materialIndex) => (
                                  <li key={materialIndex}>
                                    {material.material_id.name} -{" "}
                                    {material.quantity} uds.
                                  </li>
                                )
                              )}
                            </ul>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </Typography>
            <Link to="/ot" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Volver
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default OTDetails;
