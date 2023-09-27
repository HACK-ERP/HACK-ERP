/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '/src/contexts/AuthContext';
import Navbar from "../Navbar/Navbar";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
    <Navbar />
    <Outlet />
    </>
  );
}

export default ProtectedRoute;
