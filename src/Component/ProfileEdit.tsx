import { Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import { ValidationResponse } from "../Interface/ValidationResponse";
import MessageDialougeBox from "./MessageDialougeBox";

interface ProfileEditProps {
  editField: string;
  title: string;
  updateService:(id:number,userText:string)=>Promise<ValidationResponse>;
  fieldKey:'userName' | 'emailID';
}
const ProfileEdit: React.FC<ProfileEditProps> = ({ editField, title ,updateService,fieldKey}) => {
  const { loginData, setLoginData } = useContext(
    LoginContext
  ) as LoginContextType;
  const [edit, setEdit] = useState<boolean>(false);
  const [fieldValue, setFieldValue] = useState<string>(editField);
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    console.log("API message popup closed"); // Debugging output
    setApiMessagePopup11(false);
    setEdit(false)
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  };
  useEffect(() => {
    setFieldValue(editField);
  }, [editField]);
  const handleEdit = async () => {
    var response = await updateService(loginData.userId, fieldValue);
    if (response) {
      setLoginData({ ...loginData, [fieldKey]: fieldValue });
      setSuccess(response.success);
      setApiMessage(response.message);
      setApiMessagePopup11(true);
    }
  };
  return (
    <div>
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setEdit}
          />
        </div>
      </Modal>
    <div style={{ marginTop: "30px", width: "800px" }}>
      <Typography mb={1}>{title}</Typography>
      <TextField
        id={fieldKey}
        value={fieldValue}
        name={fieldKey}
        onChange={handleOnChange}
        disabled={!edit}
      ></TextField>
      <div style={{ float: "right", margin: "10px" }}>
        {edit && (
          <div>
            <Button
              variant="contained"
              onClick={() => {
                setEdit(false);
                setFieldValue(editField);
              }}
              style={{ backgroundColor: "red" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green" }}
              onClick={handleEdit}
            >
              Save
            </Button>
          </div>
        )}
        {!edit && (
          <Button variant="outlined" onClick={() => setEdit(true)}>
            Edit
          </Button>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProfileEdit;
