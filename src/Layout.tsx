import React, { useState } from "react";
import Header from "./Component/Header";
import SideNavBar from "./Component/SideNavBar";
import "./App.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [displayNav, setDisplayNav] = useState<boolean>(false);
  return (
    <div>
      <Header displayNav={displayNav} setDisplayNav={setDisplayNav} />
      <div>
        {displayNav && <SideNavBar />}
        <div
          style={{
            transition:
              "margin-left 0.15s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            marginLeft: displayNav ? "17%" : "0px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
