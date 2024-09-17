import { Button, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import ProfileEdit from "./ProfileEdit";
import { UpdateUserEmail, UpdateUserName } from "../Services/UserService";
import UpdatePassword from "./UpdatePassword";

export const YourAccountTab = () => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  const [updatePswd, setUpdatePswd] = useState<boolean>(false);

  const handlePswdChange = () => {
    setUpdatePswd(false);
  };

  return (
    <div>
      <Typography variant="h5">Your Account</Typography>
      <ProfileEdit
        title="User Name"
        editField={loginData.userName}
        updateService={UpdateUserName}
        fieldKey="userName"
      />
      <br />
      <hr />
      <ProfileEdit
        title="Email Address"
        editField={loginData.emailID}
        updateService={UpdateUserEmail}
        fieldKey="emailID"
      />
      <br />
      <hr />
      <Typography mt={4} mb={3}>
        Manage Password
      </Typography>
      <Button variant="contained" onClick={() => setUpdatePswd(true)}>
        Change Password
      </Button>
      <Modal open={updatePswd} onClose={handlePswdChange}>
        <div>
           <UpdatePassword setUpdatePswd={setUpdatePswd} />
        </div>
       
      </Modal>
    </div>
  );
};
