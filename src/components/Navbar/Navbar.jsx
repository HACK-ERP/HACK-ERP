
import {  NavLink } from "react-router-dom";
import { logout } from "../../stores/AccessTokenStore";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" href="/">
          Hack-ERP
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" href="/">
                Ventas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="/productos">
                Producción
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="#">
                Almacén
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="#">
                Compras
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
