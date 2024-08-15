import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SearchTextField: React.FC = () => {
  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
        style={{ backgroundColor: "white" }}
      />
    </div>
  );
};

export default SearchTextField;
