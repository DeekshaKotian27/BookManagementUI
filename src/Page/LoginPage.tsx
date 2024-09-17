import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../CSS/LoginPage.css";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import LoginComponent from "../Component/LoginComponent";
import SignUpComponent from "../Component/SignUpComponent";

const LoginPage: React.FC = () => {
  const { loginData, setLoginData } = useContext(
    LoginContext
  ) as LoginContextType;
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    setLoginData({
      userId: -1,
      emailID: "",
      password: "",
      userName: "",
      role: "",
    });
    localStorage.setItem("loginData", JSON.stringify(loginData));
    localStorage.setItem("JWTToken", "");
  }, []);

  return (
    <div>
      <Box className="Login-header">
        <Typography variant="h1" color={"white"}>
          Welcome!
        </Typography>
        <Typography variant="h6" color={"white"}>
          Sign Up/Login to our website
        </Typography>
      </Box>
      <Box className="login-signup-area">
        {isLogin ? (
          <LoginComponent />
        ) : (
          <SignUpComponent
            setIsLogin={setIsLogin}
            text="SignUp"
          />
        )}
      </Box>
      <Box className="button-Select">
        <Button
          variant={isLogin ? "contained" : "outlined"}
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
        <Button
          variant={isLogin ? "outlined" : "contained"}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default LoginPage;
