import { useState } from "react";
import Link from "@mui/material";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { logout } from "../../stores/AccessTokenStore";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [salesMenuAnchorEl, setSalesMenuAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [productionMenuAnchorEl, setProductionMenuAnchorEl] = useState(null);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleSalesMenuOpen = (event) => {
    setSalesMenuAnchorEl(event.currentTarget);
  }

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  }

  const handleProductionMenuOpen = (event) => {
    setProductionMenuAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSalesMenuAnchorEl(null);
    setUserMenuAnchorEl(null);
  }



  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              variant="h6"
              href="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Hack-ERP
            </Link>
            <Box flexGrow={1} />
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
            >
              Gestión de Personal
            </Button>
            <Menu
              id="user-menu"
              anchorEl={userMenuAnchorEl}
              keepMounted
              open={Boolean(userMenuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/users">
                Personal
              </MenuItem>
            </Menu>
            <Button
              aria-controls="sales-menu"
              aria-haspopup="true"
              onClick={handleSalesMenuOpen}
              color="inherit"
            >
              Ventas
            </Button>
            <Menu
              id="sales-menu"
              anchorEl={salesMenuAnchorEl}
              keepMounted
              open={Boolean(salesMenuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/budget">
                Presupuestos
              </MenuItem>
            </Menu>
            <Button
              aria-controls="production-menu"
              aria-haspopup="true"
              onClick={handleProductionMenuOpen}
              color="inherit">
              Producción
            </Button>
            <Menu
              id="production-menu"
              anchorEl={productionMenuAnchorEl}
              keepMounted
              open={Boolean(productionMenuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/ot">
                Ordenes de Trabajo
              </MenuItem>
            </Menu>
            <Button
              aria-controls="almacen-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              onClose={handleMenuClose}
            >
              Almacén
            </Button>
            <Menu
              id="almacen-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/products">
                Productos
              </MenuItem>
              <MenuItem component={Link} to="/materials">
                Materiales
              </MenuItem>
            </Menu>
            <Button component={Link} to="/" color="inherit">
              Compras
            </Button>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;