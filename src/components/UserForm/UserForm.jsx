import { useState } from "react";
import { createUser } from "../../services/UsersService";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(user)
      .then((response) => {
        console.log(response);
        navigate("/users");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center">
        Crear Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              size="small"
              variant="outlined"
              value={user.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              size="small"
              variant="outlined"
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              size="small"
              type="password"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Rol"
              name="role"
              size="small"
              variant="outlined"
              value={user.role}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Crear Usuario
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
        </Grid>
      </form>
    </Container>
  );
};

export default UserForm;
