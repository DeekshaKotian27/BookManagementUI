import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import "../CSS/LoginPage.css";
import { Validate } from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { User } from "../Interface/Users";

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(
    LoginContext
  ) as LoginContextType;
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    if (name === "emailID") setEmailError(false);
    if (name === "password") setPasswordError(false);
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    let isValid = true;

    if (!loginData.emailID || loginData.emailID.trim() === "") {
      setEmailError(true);
      isValid = false;
    }
    if (!loginData.password || loginData.password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    var loginResponse = await Validate(loginData);
    if (loginResponse !== null && loginResponse.success) {
      setShowErrorMessage(false);
      setErrorMessage("");
      navigate("/dashboard");
      var data = loginResponse.data as User;
      setLoginData(data);
    } else {
      setShowErrorMessage(true);
      setErrorMessage(loginResponse.message);
      setLoginData({
        userId: -1,
        emailID: "",
        password: "",
        userName: "",
        role: "",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <Typography mb={2} variant="h4">
          Login
        </Typography>
        {showErrorMessage && (
          <span>
            <div id="error-message">{errorMessage}</div>
            <br></br>
          </span>
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
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginComponent;
