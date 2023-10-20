import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '/src/contexts/AuthContext';

const ProtectedByRole = ({ allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedByRole;