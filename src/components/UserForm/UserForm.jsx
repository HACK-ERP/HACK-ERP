import { useState } from "react";
import { createUser } from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const UserForm = () => {
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, role: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(user)
      .then(() => {
        navigate("/users");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ marginTop: "30px" }}>
            Crear un empleado
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Avatar"
              variant="outlined"
              fullWidth
              name="avatar"
              value={user.avatar}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={user.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              name="surname"
              value={user.surname}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              name="phone"
              value={user.phone}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={user.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth style={{ marginTop: "16px" }}>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.role}
                label="Rol"
                onChange={handleRoleChange}
              >
                <MenuItem value={"SALES"}>SALES</MenuItem>
                <MenuItem value={"PRODUCTION"}>PRODUCTION</MenuItem>
                <MenuItem value={"WAREHOUSE"}>WAREHOUSE</MenuItem>
                <MenuItem value={"PURCHASING"}>PURCHASING</MenuItem>
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px", marginRight: "16px" }}
              >
                Crear
              </Button>

              <Link to="/users" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "16px" }}
                >
                  Volver a la lista de empleados
                </Button>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserForm;
