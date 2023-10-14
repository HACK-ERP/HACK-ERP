import { useTheme, styled } from "@mui/material/styles";
import { Button, Grid, InputLabel, NativeSelect, Paper, TextField } from "@mui/material";
import { FormControl } from "@mui/base";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const getStyles = (name, productName, theme) => {
  return {
    fontWeight:
      productName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function arrUnique(arr) {
  const result = [];
  const map = new Map();

  arr.forEach((obj) => {
    const { product_id, quantity } = obj;

    if (!map.has(product_id)) {
      map.set(product_id, quantity);
    } else {
      map.set(product_id, Number(map.get(product_id)) + Number(quantity));
    }
  });

  map.forEach((quantity, product_id) => {
    result.push({ product_id, quantity });
  });

  return result;
}

export default function ProductsMultipleChoice({ options, onChange, productsToSend, setProductsToSend, productInput, setProductInput }) {
  
  
  const theme = useTheme();

  const handleProductChange = (event, index) => {
    const { value } = event.target;
    setProductInput((prevProductInput) => {
      const newProductInput = [...prevProductInput];
      newProductInput[index].product_id = value;
      return newProductInput;
    });

    setProductsToSend(arrUnique(productInput));
    onChange(productsToSend);
  }

  const handleQuantityChange = (event, index) => {
    const { value } = event.target;
    setProductInput((prevProductInput) => {
      const newProductInput = [...prevProductInput];
      newProductInput[index].quantity = value;
      return newProductInput;
    });

    const updatedProductsToSend = arrUnique(productInput);
    setProductsToSend(updatedProductsToSend);

    onChange(updatedProductsToSend);
  }  

  return (
    <div>
      {productInput.map((Inpt, index) => (
        <Grid container spacing={2} direction="row" key={index} sx={{ mt: 2 }}>
          <Item sx={8}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Producto
              </InputLabel>
              <NativeSelect
                index={index}
                onChange={(e) => handleProductChange(e, index)}>
                {options.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                    style={getStyles(product.name, product.name, theme)} // Corregido el argumento de options.name
                  >
                    {product.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Item>
          <Item sx={4}>
            <TextField
              label="Cantidad"
              product_id={options.name}
              name="Cantidad"
              type="number"
              InputProps={{
                inputProps: {
                  min: 1,
                  max: 10000,
                },
              }}
              value={Inpt.quantity}
              onChange={(e) => handleQuantityChange(e, index)}
            />
          </Item>
        </Grid>
      ))}
      <Button
        onClick={() =>
          setProductInput((prevState) => [
            ...prevState,
            {
              product_id: options[0].id,
              quantity: 1,
            }
          ])
        }
        color="success"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Añadir Productos
      </Button>
    </div>
  );
}
