import React, { useContext } from "react";
import Layout from "../Layout";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import { TextField, Typography } from "@mui/material";

const ProfilePage = () => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  return (
    <div>
      <Layout>
        <div style={{ padding: "10px" }}>
          <Typography variant="h4" component="h1">
            {loginData.userName}
          </Typography>
          <p>
            emailID:<TextField value={loginData.emailID}></TextField>
          </p>
        </div>
      </Layout>
    </div>
  );
};

export default ProfilePage;
