import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/easyauth");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
