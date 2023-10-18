import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// import { Scrollbar } from '../../components/misc/scrollbar';
import { SeverityPill } from "../../components/misc/severity-pill";
import { Link } from "react-router-dom";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = ({orders, sx, getOTClient}) => {
 

  return (
    <Card sx={sx}>
      <CardHeader title="Últimas Órdenes de Producción" />
      {/* <Scrollbar sx={{ flexGrow: 1 }}> */}
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Orden</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              

              return (
                <TableRow hover key={order.id}>
                  <TableCell>{order.code}</TableCell>

                  <TableCell>{getOTClient(order.budget.client)}</TableCell>
                  
                  <TableCell>
                    <SeverityPill color={statusMap[order.status]}>
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {/* </Scrollbar> */}
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link to="/ot" style={{ textDecoration: "none", color: "inherit" }}>
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
          >
            Ver Órdenes
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
