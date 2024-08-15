import React from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button } from "@mui/material";

interface AddButtonProps {
  handleOnClick: () => void;
  text: string;
}
const AddButton: React.FC<AddButtonProps> = ({ handleOnClick, text }) => {
  return (
    <div>
      <Button
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={handleOnClick}
        style={{ backgroundColor: "green", color: "white" }}
      >
        {text}
      </Button>
    </div>
  );
};

export default AddButton;
