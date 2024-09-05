import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";
import { Register, Validate } from "../Services/UserService";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import { User } from "../Interface/Users";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(
    LoginContext
  ) as LoginContextType;
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  useEffect(()=>{
    setLoginData({ emailID: "", password: "", userName: "" });
    localStorage.setItem("loginData",JSON.stringify(loginData));
    localStorage.setItem("JWTToken","");
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    if (name === "userName") setUserNameError(false);
    if (name === "emailID") setEmailError(false);
    if (name === "password") setPasswordError(false);
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserNameError(false);
    setEmailError(false);
    setPasswordError(false);

    let isValid=true;

    if (!isLogin && (!loginData.userName || loginData.userName.trim() === "")) {
      setUserNameError(true);
      isValid=false;
    }
    if (!loginData.emailID  || loginData.emailID.trim() === "") {
      setEmailError(true);      
      isValid=false;
    }
    if (!loginData.password || loginData.password.trim() === "") {
      setPasswordError(true);
      isValid=false;
    }
    if (!isValid) {
      return;
    }
    if (isLogin) {
      var loginResponse = await Validate(loginData);
      if (loginResponse !== null && loginResponse.success) {
        setShowErrorMessage(false);
        setErrorMessage("");
        navigate("/dashboard");
        var data=loginResponse.data as User;
        setLoginData(data);
      } else {
        setShowErrorMessage(true);
        setErrorMessage(loginResponse.message);
        setLoginData({ emailID: "", password: "", userName: "" });
      }
    } else {
        var regData = await Register(loginData);
        if(regData!==null && regData.success)
        {
          setIsLogin(true);
          setLoginData(regData.data as User);
        }else{
          setShowErrorMessage(true);
          setErrorMessage(regData.message);
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
              <Box>
                <TextField
                  label="User Name"
                  name="userName"
                  value={loginData.userName}
                  onChange={handleChange}
                  error={userNameError}
                  helperText={userNameError && "Please enter your Name"}
                />
              </Box>
          )}
          <Box mt={2}>
            <TextField
              label="Email ID"
              name="emailID"
              type="email"
              value={loginData.emailID}
              onChange={handleChange}
              error={emailError}
              helperText={emailError && "Please enter your email"}
            />
          </Box>
          <Box mt={2}>
            <TextField
              type="password"
              label="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              error={passwordError}
              helperText={passwordError && "Please enter the Password"}
            />
          </Box>
          <Box mt={2}>
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
    </div>
  );
};

export default LoginPage;
