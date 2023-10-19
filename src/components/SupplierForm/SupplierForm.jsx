import { useState } from "react";
import { createSupplier } from "../../services/SuppliersService";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";

const SupplierForm = () => {
  const [supplier, setSupplier] = useState({
    logo: "",
    name: "",
    cif: "",
    phone: "",
    email: "",
    address: "",
    rowMaterials: [],
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createSupplier(supplier)
      .then((response) => {
        console.log(response);
        navigate("/suppliers");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ marginTop: "30px" }}>
            Crear un proveedor
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Logo"
              variant="outlined"
              name="logo"
              value={supplier.logo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nombre"
              variant="outlined"
              name="name"
              value={supplier.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CIF"
              variant="outlined"
              name="cif"
              value={supplier.cif}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              name="phone"
              value={supplier.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={supplier.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Dirección"
              variant="outlined"
              name="address"
              value={supplier.address}
              onChange={handleChange}
              fullWidth
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

              <Link to="/suppliers" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "16px" }}
                >
                  Volver a la lista de proveedor
                </Button>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SupplierForm;
