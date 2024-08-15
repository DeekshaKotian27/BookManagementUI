import React from "react";
import "../App.css";
import { Button } from "@mui/material";

const SideNavBar: React.FC = () => {
  return (
    <div>
      <div className="Navbar">
        <a href="/book">
          <Button>Books</Button>
        </a>
        <a href="/author">
          <Button>Authors</Button>
        </a>
        <a href="/category">
          <Button>Category</Button>
        </a>
        <a href="/publisher">
          <Button>Publisher</Button>
        </a>
      </div>
    </div>
  );
};

export default SideNavBar;
