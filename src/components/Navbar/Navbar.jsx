import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { logout } from "../../stores/AccessTokenStore";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Hack-ERP
            </Typography>
            <Box flexGrow={1} />
            <Button component={Link} to="/" color="inherit">
              Ventas
            </Button>
            <Button component={Link} to="/" color="inherit">
              Producción
            </Button>
            <Button
              aria-controls="almacen-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
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

// import { NavLink } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
// import { logout } from '../../stores/AccessTokenStore';

// const Navbar = () => {
//   const { user } = useAuthContext();

//   return (
//     <nav className="Navbar navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <NavLink className="navbar-brand" to="/">Gymhack</NavLink>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             {!user ? (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/register">Register</NavLink>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/profile">Profile</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/store">Store</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <button className="nav-link" onClick={logout}>Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
