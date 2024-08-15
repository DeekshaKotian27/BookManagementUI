import React, { useContext } from "react";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  if (loginData.emailID === "") {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
