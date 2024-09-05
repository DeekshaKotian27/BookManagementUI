import { Button, Typography } from "@mui/material";
import React from "react";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

interface MessageDialougeBoxProps {
  apiMessage: String;
  success: boolean;
  setApiMessagePopup: (show: boolean) => void;
  setShowPopup?: (show: boolean) => void;
}

const MessageDialougeBox: React.FC<MessageDialougeBoxProps> = ({
  apiMessage,
  setApiMessagePopup,
  success,
  setShowPopup,
}) => {
  return (
    <div>
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <div style={{ textAlign: "center" }}>
          {success ? (
            <CheckCircleSharpIcon sx={{ color: "green" }} />
          ) : (
            <CancelSharpIcon sx={{ color: "red" }} />
          )}
        </div>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {success ? "Success" : "Failure"}
        </Typography>
        <Typography variant="subtitle1">{apiMessage}</Typography>
      </div>
      <Button
        variant="contained"
        fullWidth
        style={{ backgroundColor: "green" }}
        onClick={() => {
          setApiMessagePopup(false);
          if (setShowPopup) setShowPopup(false);
        }}
      >
        Continue
      </Button>
    </div>
  );
};

export default MessageDialougeBox;
