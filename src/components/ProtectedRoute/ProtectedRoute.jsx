/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '/src/contexts/AuthContext';
import {TotalBar} from "../TotalBar/TotalBar";


const ProtectedRoute = () => {
  const { user } = useAuthContext();
  const Page = () => {
    return (
      <>
        <Outlet />
      </>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }

  return (


    <>
    <TotalBar>
    {Page()}
    </TotalBar>
    </>
  );
}

export default ProtectedRoute;
