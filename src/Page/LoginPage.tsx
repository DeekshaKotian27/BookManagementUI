import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";
import { Register, Validate } from "../Services/UserService";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(
    LoginContext
  ) as LoginContextType;
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      try {
        var data = await Validate(loginData);
        if (data.password !== loginData.password) {
          setShowErrorMessage(true);
          setErrorMessage("Invalid Password");
          setLoginData({ emailID: "", password: "", userName: "" });
        } else {
          setShowErrorMessage(false);
          setErrorMessage("");
          navigate("/dashboard");
          setLoginData(data);
        }
      } catch {
        setShowErrorMessage(true);
        setErrorMessage(
          "The MailID is not registered to the webiste.To register please Sign Up."
        );
        setLoginData({ emailID: "", password: "", userName: "" });
      }
    } else {
      try {
        var regData = await Register(loginData);
        setIsLogin(true);
        setLoginData(regData);
      } catch {
        setShowErrorMessage(true);
        setErrorMessage("Failed to Sign Up, Please Try again later");
        setLoginData({ emailID: "", password: "", userName: "" });
      }
    }
  };

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
        <form onSubmit={submitLogin}>
          <Typography mb={2} variant="h4">
            {isLogin ? "Login" : "Sign Up"}
          </Typography>
          {showErrorMessage && (
            <span>
              <div id="error-message">{errorMessage}</div>
              <br></br>
            </span>
          )}
          {!isLogin && (
            <Box mb={2}>
              <TextField
                label="User Name"
                name="userName"
                value={loginData.userName}
                onChange={handleChange}
              />
            </Box>
          )}
          <Box mb={2}>
            <TextField
              label="Email ID"
              name="emailID"
              type="email"
              value={loginData.emailID}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Button variant="outlined" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </form>
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
      {/* <div id="header">
        <h1>Login</h1>
      </div>
      {showErrorMessage && (
        <span>
          <div id="error-message">Wrong mail id or password</div>
          <br></br>
        </span>
      )}

      <div id="body">
        <form onSubmit={submitLogin}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Email ID"
                name="loginId"
                value={loginData.loginId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                type="password"
                label="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div> */}
    </div>
  );
};

export default LoginPage;
