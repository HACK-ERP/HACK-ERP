import { useTheme, styled } from "@mui/material/styles";
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

function arrUnique(arr) {
  const result = [];
  const map = new Map();

  arr.forEach((obj) => {
    const { material_id, quantity, price } = obj;

    if (!map.has(material_id)) {
      map.set(material_id, { quantity, price });
    } else {
      const existingMaterial = map.get(material_id);
      existingMaterial.quantity += quantity;
      map.set(material_id, existingMaterial);
    }
  });

  map.forEach(({ quantity, price }, material_id) => {
    result.push({ material_id, quantity, price });
  });

  return result;
}

export default function MultipleChoice({ options, onChange }) {
  const [materialInput, setMaterialInput] = useState([]);
  const [materialsToSend, setMaterialsToSend] = useState([]);
  const theme = useTheme();

  const handleMaterialChange = (event, index) => {
    const { value } = event.target;
    setMaterialInput((prevMaterialInput) => {
      const newMaterialInput = [...prevMaterialInput];
      newMaterialInput[index].material_id = value;
      return newMaterialInput;
    });

    setMaterialsToSend(arrUnique(materialInput));

    onChange(materialsToSend);
  }

  const handleQuantityChange = (event, index) => {
    const { value } = event.target;
    setMaterialInput((prevMaterialInput) => {
      const newMaterialInput = [...prevMaterialInput];
      newMaterialInput[index].quantity = value;
      return newMaterialInput;
    });

    setMaterialsToSend(arrUnique(materialInput));

    const materialToSave = { ...materialInput[index] };
    materialToSave.quantity = materialInput.filter((material, i) => material.material_id === materialToSave.material_id && index !== i).reduce((acc, material) => acc + Number(material.quantity), Number(materialToSave.quantity));

    onChange(materialsToSend);
  }

  return (
    <div>
      {materialInput.map((Inpt, index) => (
        <Grid container spacing={2} direction="row" key={index} sx={{ mt: 2 }} >
          <Item sx={8}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Material
              </InputLabel>
              <NativeSelect
                index={index}
                onChange={(e) => handleMaterialChange(e, index)}
              >
                {options.map((material) => (
                  <option
                    key={material.id}
                    value={material.id}
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
              material_id={options.name}
              name="Cantidad"
              type="number"
              InputProps={{
                inputProps: {
                  min: 1,
                  max: 100, // Valor máximo permitido
                },
              }}
              value={Inpt.quantity}
              onChange={(e) => handleQuantityChange(e, index)}
            />
          </Item>
        </Grid>
      ))}
      <Button
        onClick={() => setMaterialInput((prevState) => [
          {
            material_id: options[0].id,
            quantity: 1,
            price: options[0].price,
          },
          ...prevState,
        ])}
        color="success"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Añadir Materiales
      </Button>
    </div>
  );
}
