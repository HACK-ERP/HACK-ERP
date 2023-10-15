import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import { getSupplierDetail } from "../../services/SuppliersService";

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupplierDetail(id)
      .then((supplier) => {
        setSupplier(supplier);
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

  if (!supplier) {
    return <Typography>Supplier not found</Typography>;
  }

  const { name, phone, email, logo } = supplier;

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
        Detalle del proveedor
      </Typography>
      <Box mt={4}>
        <Card sx={{ maxWidth: "50%" }}>
          {" "}
          <Avatar
            alt="Remy Sharp"
            src={logo}
            sx={{ width: 250, height: 250 }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Teléfono:</strong> {phone}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> {email}
            </Typography>
            <Link to="/suppliers" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" style={{ marginTop: "16px" }}>
                Volver
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SupplierDetails;
