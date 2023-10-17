import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import { detailNotification } from "../../services/notificationsService";

const NotificationDetails = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detailNotification(id)
      .then((notification) => {
        setNotification(notification);
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

  if (!notification) {
    return <Typography>Notificación no encontrada</Typography>;
  }
  return (
    <Container>

      <Box mt={4}>
        <Card sx={{ maxWidth: "50%" }}>

          <Grid mt={4} container spacing={2} alignItems={'center'} justifyContent={'center'} >
            <Grid item xs={3} ml alignItems={'center'} justifyContent={'center'}>
              <Avatar
              sx={ {width: 150, height: 150} }
                alt={notification.sender?.name}
                src={notification.sender?.avatar}
              />
            </Grid>
            <Grid item xs={9} ml alignItems={'center'} justifyContent={'center'} >
              <Typography variant="h5" gutterBottom textAlign={'center'}>
                {notification.sender?.name}
              </Typography>
            </Grid>
          </Grid>

          <CardContent>
            <Typography variant="body1" paragraph>
              <strong>Área notificada:</strong> {notification.receiver === "Administrador" ? "Administración" : notification.receiver}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Mensaje:</strong> {notification.message}
            </Typography>
            <br />

            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary" style={{ marginTop: "16px" }}>
                Volver
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default NotificationDetails;
