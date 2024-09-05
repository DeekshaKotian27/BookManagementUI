import { Button, Typography } from "@mui/material";
import React from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

interface YesNoDialougeBoxProps {
  Id: number;
  handleDelete: (id: number) => void;
  setDeletePopup: (show: boolean) => void;
}

const YesNoDialougeBox: React.FC<YesNoDialougeBoxProps> = ({
  Id,
  handleDelete,
  setDeletePopup,
}) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div style={{ textAlign: "center" }}>
        <DeleteForeverRoundedIcon sx={{ color: "red", pt: "10px" }} />
      </div>
      <Typography
        sx={{ p: "10px 10px 0 10px", textAlign: "center" }}
        variant="h4"
      >
        Are you sure?
      </Typography>
      <hr />
      <Typography sx={{ p: "0 10px 0 10px" }} variant="subtitle1">
        Are you sure to delete this item? This cannot be undone
      </Typography>
      <div
        style={{ padding: "10px", display: "flex", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "green" }}
          onClick={() => handleDelete(Id)}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "red" }}
          onClick={() => setDeletePopup(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default YesNoDialougeBox;
