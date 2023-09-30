import { useTheme, styled } from "@mui/material/styles";
/* import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select"; */
import { Button, Grid, InputLabel, NativeSelect, Paper, TextField } from "@mui/material";

import { FormControl } from "@mui/base";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function getStyles(name, materialName, theme) {
  return {
    fontWeight:
      materialName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// Al pulsar añadir, se crea un nuevo objeto material con el id y la cantidad

export default function MultipleChoice({ options, onChange, quantity }) {
  const [materialInput, setMaterialInput] = useState([]);
  const theme = useTheme();
  return (
    <div>
      {materialInput.map((Inpt, index) => (
        <Grid container spacing={2} direction="row" key={index} sx={{mt:2}} >
          <Item sx={8}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Material
            </InputLabel>
            <NativeSelect>
              {options.map((material) => (
                <option
                  key={material.id}
                  value={material}
                  style={getStyles(material.name, options, theme)}
                >
                  {material.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          </Item>
          <Item sx={4}>
          <TextField
            label="Cantidad"
            id="Cantidad"
            name="Cantidad"
            type="number"
            InputProps={{
              inputProps: {
                min: 0, // Valor mínimo permitido
                max: 100, // Valor máximo permitido
              },
            }}
            value={quantity}
            onChange={onChange}
          />
          </Item>

        </Grid>
      ))}
      <Button
        onClick={() => setMaterialInput([...materialInput, {}])}
        color="success"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Añadir Materiales
      </Button>
    </div>
  );
}
