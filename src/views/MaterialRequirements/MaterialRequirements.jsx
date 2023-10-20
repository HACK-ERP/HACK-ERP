import { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { getOTList } from "../../services/OTService";
import { getMaterialRequirementList } from "../../services/MaterialRequirementsService";
import Collapse from '@mui/material/Collapse';
import Skeleton from '@mui/material/Skeleton';


export default function CollapsibleTable() {
  const [otList, setOtList] = useState([]);
  const [materialRequirements, setMaterialRequirements] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOTList()
      .then((response) => {
        response = response.filter((ot) => ot.status === "Materiales Solicitados");
        setOtList(response);
      })
      .catch((error) => {
        console.error("Error fetching OT list:", error);
      });
  }, []);

  useEffect(() => {
    const materialData = {};
    const fetchMaterialRequirements = async () => {
      for (const ot of otList) {
        try {
          const requirements = await getMaterialRequirementList(ot.id);
          materialData[ot.id] = requirements;
        } catch (error) {
          console.error(`Error fetching material requirements for OT ${ot.id}:`, error);
        }
      }
      setMaterialRequirements(materialData);
      setLoading(false);
    };

    if (otList.length > 0) {
      fetchMaterialRequirements();
    }
  }, [otList]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
        Solicitud de Materiales
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Orden de Trabajo</TableCell>
              <TableCell align="right">Cantidad de Materiales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otList.map((ot,) => (
              <Row key={ot.id} ot={ot} materialRequirements={materialRequirements[ot.id]} loading={loading} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

function Row(props) {
  const { ot, materialRequirements, loading } = props;
  const [open, setOpen] = useState(false);


  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {ot.code}
        </TableCell>
        {loading ? (
          <TableCell align="right">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </TableCell>
        ) : (
          <TableCell align="right">{materialRequirements.length}</TableCell>
        )}

        <TableCell align="right">{ot.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {materialRequirements && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Material</TableCell>
                      <TableCell>Pedido&nbsp;(und)</TableCell>
                      <TableCell>Stock&nbsp;(und)</TableCell>
                      <TableCell align="right">Precio (€)</TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {materialRequirements.map((material, i) => (
                      <TableRow key={i}>
                        <TableCell>{material.materials.name}</TableCell>
                        <TableCell>{material.materials.quantity}</TableCell>
                        <TableCell sx={Number(material.materials.quantity) > Number(material.materials.stock) ? { color: "red" } : { color: "primary.main" }}>{material.materials.stock}</TableCell>
                        <TableCell align="right">{material.materials.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="info"
                            href={`/purchases/${ot.id}/create/${material.materials.material_id}`}
                            disabled={Number(material.materials.stock) > Number(material.materials.quantity)}>
                            Comprar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

