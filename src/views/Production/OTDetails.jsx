import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Box,
} from "@mui/material";
import { getOTDetail } from "../../services/OTService";

const OTDetails = () => {
  const { id } = useParams();
  const [ot, setOT] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOTDetail(id)
      .then((ot) => {
        setOT(ot);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!ot) {
    return <Typography>OT not found</Typography>;
  }

  const { code, status } = ot;

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
        Detalle de la OT
      </Typography>
      <Box mt={4}>
        <Card sx={{ maxWidth: "50%" }}>
          {" "}
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {code}
            </Typography>
            {/* <Typography variant="body1" paragraph>
              <strong>Products:</strong> {ot.budget.products}
            </Typography> */}
            <Typography variant="body1" paragraph>
              <strong>Estado:</strong> {status}
            </Typography>
            <Link to="/ot" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Volver
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default OTDetails;
