import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";

interface ProfileSideBarProps {
  setTabNum: (num: number) => void;
}

const ProfileSideBar: React.FC<ProfileSideBarProps> = ({ setTabNum }) => {
  const { loginData } = useContext(LoginContext) as LoginContextType;

  return (
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
            padding: "25px",
            marginRight: "10px",
          }}
        >
          <h1>
            {loginData.userName
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase())
              .join("")}
          </h1>
        </Avatar>
        <div style={{display:"flex",flexDirection:"column"}}>
          <Typography variant="h6">{loginData.userName}</Typography>
          <Typography variant="subtitle2">{loginData.role.toUpperCase()}</Typography>
        </div>
      </div>
      <Box mt={2}>
        <Button variant="text" onClick={() => setTabNum(1)}>
          Your Account
        </Button>
      </Box>
      {loginData.role.toLocaleLowerCase()==="admin" &&
          <Box mt={2}>
          <Button variant="text" onClick={() => setTabNum(2)}>
            User List
          </Button>
        </Box>
      }
      
    </div>
  );
};

export default ProfileSideBar;
