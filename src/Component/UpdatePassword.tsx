import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, {  useContext, useEffect, useState } from "react";
import { UpdateUserPassword } from "../Services/UserService";
import  {LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import MessageDialougeBox from "./MessageDialougeBox";

interface UpdatePasswordProps {
  setUpdatePswd: (show: boolean) => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ setUpdatePswd }) => {
    const { loginData, setLoginData } = useContext(
        LoginContext
      ) as LoginContextType;
  const [currentPswd, setCurrentPswd] = useState<string>("");
  const [newPswd, setNewPswd] = useState<string>("");
  const [confirmPswd, setConfirmPswd] = useState<string>("");
  const [disableUpdatePassword, setDisableUpdatePassword] = useState<boolean>(true);
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    console.log("API message popup closed"); // Debugging output
    setApiMessagePopup11(false);
    setUpdatePswd(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPswd(value);
    } else if (name === "confirmPassword") {
      setConfirmPswd(value);
    } else if (name === "currentPassword") {
      setCurrentPswd(value);
    }
  };

  const handleUpdatePswd = async () => {
    var response=await UpdateUserPassword(loginData.userId,currentPswd,newPswd)
    if(response){
        setLoginData({...loginData,password:newPswd});
        setSuccess(response.success);
        setApiMessage(response.message);
        setApiMessagePopup11(true);
    }
    setNewPswd("");
    setConfirmPswd("");
    setCurrentPswd("");
};

  useEffect(() => {
    if (newPswd === confirmPswd && newPswd.length > 0) {
      setDisableUpdatePassword(false);
    } else {
      setDisableUpdatePassword(true);
    }
  }, [newPswd, confirmPswd]);
  return (
    <div>
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setUpdatePswd}
          />
        </div>
      </Modal>
    <div
      style={{
        backgroundColor: "white",
        width: "fit-Content",
        position: "absolute",
        top: "25%",
        left: "43%",
      }}
    >
      <Typography p={2} pb={0} variant="h5">
        Change Password
      </Typography>
      <Box m={2}>
        <TextField
          fullWidth
          type="password"
          name="currentPassword"
          value={currentPswd}
          label="Current Password"
          onChange={handleChange}
        />
      </Box>
      <Box m={2}>
        <TextField
          fullWidth
          type="password"
          name="newPassword"
          value={newPswd}
          label="New Password"
          onChange={handleChange}
        />
      </Box>
      <Box m={2}>
        <TextField
          fullWidth
          type="password"
          name="confirmPassword"
          value={confirmPswd}
          label="Confirm New Password"
          onChange={handleChange}
        />
      </Box>
      <Box m={2} pb={3}>
        <Button
          variant={disableUpdatePassword ? "outlined" : "contained"}
          disabled={disableUpdatePassword}
          onClick={handleUpdatePswd}
        >
          Update Password
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={() => setUpdatePswd(false)}
        >
          Cancel
        </Button>
      </Box>
    </div>
    </div>
  );
};

export default UpdatePassword;
