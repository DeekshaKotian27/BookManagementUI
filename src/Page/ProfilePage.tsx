import React, { useContext } from "react";
import Layout from "../Layout";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import { Avatar, Button, TextField, Typography } from "@mui/material";

const ProfilePage: React.FC = () => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  return (
    <div>
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="profilePage-side-bar" style={{ margin: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "green",
                  padding: "10px",
                }}
              >
                <h1>
                  {loginData.userName
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase())
                    .join("")}
                </h1>
              </Avatar>
              <Typography variant="h6">{loginData.userName}</Typography>
            </div>
            <br />
            <Typography >
              Your Account
            </Typography>
            <br />
            <Typography >
              User List
            </Typography>
            <br />
            <Typography >
              Add User
            </Typography>
            <br />
          </div>
          <div
            style={{
              padding: "10px",
              borderLeft: "1px solid",
              marginTop: "20px",
            }}
          >
            <Typography variant="h5">Your Account</Typography>
            <div style={{ marginTop: "30px", width:"800px"}}>
              <Typography >User Name</Typography>
              <p style={{margin:5}}>This is the username which displays on the Profile section.  </p>
              <TextField value={loginData.userName} name="userName"></TextField>
              <Button sx={{float:"right"}} variant="contained">Edit</Button>
            </div>
            <br/>
            <hr/>
            <br/>
            <div>
              <Typography mb={1}>Email ID</Typography>
              <TextField value={loginData.emailID} name="emailID"></TextField>
              <Button sx={{float:"right"}} variant="contained">Edit</Button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProfilePage;
