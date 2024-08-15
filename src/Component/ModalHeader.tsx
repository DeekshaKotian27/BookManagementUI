import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "../CSS/StylePages.css";

interface ModalHeaderProps {
  handleClose: () => void;
  heading: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ handleClose, heading }) => {
  return (
    <div className="add-header">
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" component="h1" style={{ textAlign: "center" }}>
        {heading}
      </Typography>
    </div>
  );
};

export default ModalHeader;
