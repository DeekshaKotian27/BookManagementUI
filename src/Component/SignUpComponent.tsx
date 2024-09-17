import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdminUpdateUser, Register } from "../Services/UserService";
import { User } from "../Interface/Users";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import MessageDialougeBox from "./MessageDialougeBox";

interface SignUpComponentProps {
  setIsLogin: (show: boolean) => void;
  text: string;
  editUser?: User;
  handleUserAddedOrUpdated?: () => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({
  setIsLogin,
  text,
  editUser,
  handleUserAddedOrUpdated
}) => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  const [signupData, setSignupData] = useState<User>({
    emailID: "",
    userName: "",
    password: "",
    role: "",
    userId: -1,
  });
  const [roleData, setRoleData] = useState<string>("");
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    setApiMessagePopup11(false);
    setIsLogin(false); //setAddUser from userList
  };

  useEffect(() => {
    if (editUser) {
      setSignupData(editUser);
      setRoleData(editUser.role);
    }
  }, [editUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
    if (name === "userName") setUserNameError(false);
    if (name === "emailID") setEmailError(false);
    if (name === "password") setPasswordError(false);
  };

  const regsiterUser = async (roleDataValue: string, signupData: User) => {
    var regData = await Register(roleDataValue, signupData);
    if (loginData.role === "admin" && regData) {
      setSuccess(regData.success);
      setApiMessage(roleData.toLocaleUpperCase + " Registration Successfull ");
      setApiMessagePopup11(true);
      if (handleUserAddedOrUpdated) {
        handleUserAddedOrUpdated();
      }
    } else {
      setIsLogin(true); //setis login data from login page
    }
  };

  const updateUser = async (signupData: User) => {
    var updateData = await AdminUpdateUser(signupData.userId, signupData);
    if (updateData) {
      setSuccess(updateData.success);
      setApiMessage(updateData.message);
      setApiMessagePopup11(true);
      if (handleUserAddedOrUpdated) {
        handleUserAddedOrUpdated();
      }
    }
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    let isValid = true;
    if (!signupData.userName || signupData.userName.trim() === "") {
      setUserNameError(true);
      isValid = false;
    }
    if (!signupData.emailID || signupData.emailID.trim() === "") {
      setEmailError(true);
      isValid = false;
    }
    if (!signupData.password || signupData.password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    if (editUser) {
      const updatedSignupData = {
        ...signupData,
        role: roleData,
      };
      await updateUser(updatedSignupData);
    } else {
      let roleDataValue = loginData.role === "admin" ? roleData : "user";

      await regsiterUser(roleDataValue, signupData);
    }
    setSignupData({
      userId: -1,
      emailID: "",
      password: "",
      userName: "",
      role: "",
    });
  };
  return (
    <div>
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setIsLogin}
          />
        </div>
      </Modal>
      <form onSubmit={handleSubmitForm}>
        <Typography mb={2} variant="h4">
          {text}
        </Typography>
        {apiMessagePopUp && (
          <span>
            <div id="error-message">{apiMessage}</div>
            <br></br>
          </span>
        )}
        <Box>
          <TextField
            label="User Name"
            name="userName"
            value={signupData.userName}
            onChange={handleChange}
            error={userNameError}
            helperText={userNameError && "Please enter your Name"}
          />
        </Box>

        <Box mt={2}>
          <TextField
            label="Email ID"
            name="emailID"
            type="email"
            value={signupData.emailID}
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
            value={signupData.password}
            onChange={handleChange}
            error={passwordError}
            helperText={passwordError && "Please enter the Password"}
          />
        </Box>
        {loginData.role === "admin" && (
          <Box mt={2}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <RadioGroup row value={roleData}>
                <FormControlLabel
                  control={<Radio />}
                  label="User"
                  value="user"
                  onChange={() => {
                    setRoleData("user");
                  }}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Admin"
                  value="admin"
                  onChange={() => {
                    setRoleData("admin");
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}
        <Box mt={2}>
          <Button variant="outlined" type="submit">
            {text}
          </Button>
          {loginData.role === "admin" && (
            <Button
              variant="outlined"
              onClick={() => {
                setIsLogin(false);
                setSignupData({
                  userId: -1,
                  emailID: "",
                  password: "",
                  userName: "",
                  role: "",
                });
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </div>
  );
};

export default SignUpComponent;
