import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/UsersService";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserDetail } from "../../services/UsersService";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetail(id)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    updateUser(id, user)
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, role: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  const { name, phone, email, avatar } = user;

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ marginTop: "30px" }}>
            Editar empleado
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Avatar"
              variant="outlined"
              fullWidth
              name="avatar"
              value={avatar}
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
            {/* <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
            /> */}
            <FormControl fullWidth style={{ marginTop: "16px" }}>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.role}
                label="Rol"
                onChange={handleRoleChange}
              >
                <MenuItem value={"Ventas"}>Ventas</MenuItem>
                <MenuItem value={"Producción"}>Producción</MenuItem>
                <MenuItem value={"Logistica"}>Logistica</MenuItem>
                <MenuItem value={"Compras"}>Compras</MenuItem>
                <MenuItem value={"Administrador"}>Administrador</MenuItem>
              </Select>
            </FormControl>
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
                to="/users"
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

export default UserEdit;
