import { Button, Typography } from "@mui/material";
import React from "react";

interface DashboardButtonProps {
  count: number;
  text: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({ count, text }) => {
  return (
    <div>
      <Button variant="contained" fullWidth>
        <div>
          <Typography variant="h6" style={{ marginBottom: 0 }}>
            {count}
          </Typography>
          <p style={{ marginTop: 0 }}>{text}</p>
        </div>
      </Button>
    </div>
  );
};

export default DashboardButton;
