import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import errorimage from "../Image/error.png";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <img src={errorimage} alt="Error-Image" height="100%"></img>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h4" component="h1">
          Oops, we cannot find the page!!!
        </Typography>
        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
