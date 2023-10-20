import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { createMaterial } from "../../services/Materials";

const MaterialsCreate = () => {
    const [material, setMaterials] = useState({
        name: "",
        description: "",
        image: "",
    });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMaterials({ ...material, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMaterial(material)
      .then(() => {
        navigate("/materials");
      })
      .catch((error) => console.log(error));
  };


  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom style={{ marginTop: "30px" }}>
            Crear un material
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={material.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              name="description"
              value={material.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Imagen"
              variant="outlined"
              fullWidth
              name="image"
              value={material.image}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              name="precio"
              value={material.price}
              onChange={handleChange}
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

              <Link to="/materials" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "16px" }}
                >
                  Volver a la lista de materiales
                </Button>
              </Link>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MaterialsCreate;
