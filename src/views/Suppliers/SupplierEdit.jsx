import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateSupplier } from "../../services/SuppliersService";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { getSupplierDetail } from "../../services/SuppliersService";

const SupplierEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleUpdate = (event) => {
    event.preventDefault();

    updateSupplier(id, supplier)
      .then(() => {
        navigate("/suppliers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSupplier({ ...supplier, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!supplier) {
    return <p>Supplier not found</p>;
  }

  const { name, phone, email, logo, cif } = supplier;

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ marginTop: "30px" }}>
            Editar proveedor
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Logo"
              variant="outlined"
              fullWidth
              name="logo"
              value={logo}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="CIF"
              variant="outlined"
              fullWidth
              name="cif"
              value={cif}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              name="phone"
              value={phone}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={handleChange}
              margin="normal"
            />
            <Box>
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Guardar cambios
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/suppliers"
                style={{ marginTop: "20px", marginLeft: "20px" }}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SupplierEdit;
