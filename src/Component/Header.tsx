import React, { useContext, useState } from "react";
import "../App.css";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  displayNav: boolean;
  setDisplayNav: (show: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ displayNav, setDisplayNav }) => {
  var navigate = useNavigate();
  var { loginData, setLoginData } = useContext(
    LoginContext
  ) as LoginContextType;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setLoginData({ userId:-1,emailID: "", password: "", userName: "" ,role:""});
    localStorage.removeItem("loginData");
    localStorage.removeItem("JWTToken");
  };
  return (
    <div>
      <div className="primary-nav">
        {displayNav ? (
          <IconButton onClick={() => setDisplayNav(false)}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setDisplayNav(true)}>
            <ListIcon />
          </IconButton>
        )}
        <h3>
          <a
            href="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Book Managment
          </a>
        </h3>
        {/* <Button
          variant="contained"
          startIcon={<PersonIcon />}
          onClick={() =>
            setLoginData({ emailID: "", password: "", userName: "", image: "" })
          }
        >
          Logout
        </Button> */}
        <Tooltip title={loginData.emailID}>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ p: 0.5 }}>
              {loginData.userName
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          disableScrollLock
        >
          <MenuItem onClick={() => navigate("/Myprofile")}>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
