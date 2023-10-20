import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialList, purchaseMaterials } from "../../services/Materials";
import { getMaterialRequirementList } from "../../services/MaterialRequirementsService";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    NativeSelect,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const PurchaseMaterials = () => {
    const { id } = useParams();
    const { material_id } = useParams();

    const [materials, setMaterials] = useState({});
    const [reqMaterials, setReqMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMaterialList()
            .then((response) => {
                setMaterials(response);
            })
            .catch((error) => {
                console.error("Error fetching material requirements:", error);
            });
    }, []);

    useEffect(() => {
        getMaterialRequirementList(id)
            .then((response) => {
                setReqMaterials(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching material requirements:", error);
            });
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    } else {
        const materialStock = materials?.find((material) => material.id === material_id);
        const randomFactor = Math.random() * (1.05 - 0.95) + 0.95;
        const pricePerSupplier = [];

        materialStock?.suppliers.forEach((supplier) => {
            pricePerSupplier.push({
                supplierName: supplier.name,
                supplierPrice: Number((materialStock.price * randomFactor).toFixed(2)),
            });
        });

        const materialMatch = reqMaterials.find((item) => item.materials.material_id === material_id);



        return (
            <Container component="main" maxWidth="md" sx={{ my: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <RecipeReviewCard
                    materialMatch={materialMatch}
                    materialStock={materialStock}
                    suppliers={pricePerSupplier}
                    id={material_id}
                />
            </Container>
        );
    }
};

export default PurchaseMaterials;

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

function RecipeReviewCard({
    materialStock,
    suppliers,
    materialMatch,
    setMaterial,
    id
 }) {
    const [expanded, setExpanded] = useState(false);
    const [stockInput, setStockInput] = useState(materialMatch?.materials?.quantity - materialStock?.stock);
    const [price, setPrice] = useState(materialMatch?.materials?.price);
    const navigate = useNavigate();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = (event) => {
        console.log("event:", event.target.value);
        const  value  = event.target.value;
        console.log("Valor de la compra:", value);

        setStockInput(value);

        console.log("Cantidad por comprar:", value);
    };

    const handlePurchase = async () => {
        console.log(stockInput + materialStock.stock)
        try {
            const response = await purchaseMaterials(id, {
                stock: Number(stockInput),
                price: Number(Number(price).toFixed(2)),
            });
           
            console.log('Compra exitosa:', response);
            navigate('/purchases');

        } catch (error) {
            console.error('Error en la compra:', error);
        }
    };


 

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={materialMatch?.otNumber} />
            <CardMedia component="img" height="194" image={materialStock?.image} alt="Paella dish" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {materialStock?.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{materialStock?.name}</Typography>
                    <FormControl>
                        <Box sx={{ minWidth: 120 }}>
                            <InputLabel variant="standard">Proveedor - Precio</InputLabel>
                            <NativeSelect
                                id="demo-simple-select-standard"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                label="Proveedor - Precio"
                            >
                                {suppliers.map((supplier) => (
                                    <option key={supplier.supplierName} value={supplier.supplierPrice}>
                                        {supplier.supplierName} - {supplier.supplierPrice}€
                                    </option>
                                ))}
                            </NativeSelect>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <span style={{ fontSize: "10px", color: "red" }}>
                                El pedido es por: {materialMatch?.materials?.quantity} und
                            </span>
                        </Box>
                        <TextField
                            id="outlined-number"
                            label="Cantidad por comprar"
                            type="number"
                            sx={{ my: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={stockInput}
                            onChange={(event) =>handleChange(event)}
                        />
                        <Typography paragraph>Total de la compra: <strong>{Number((stockInput*price).toFixed(2))}€</strong></Typography>
                        
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={handlePurchase}
            >
                Comprar
            </Button>
                    </FormControl>
                </CardContent>
            </Collapse>
        </Card>
    );
}
