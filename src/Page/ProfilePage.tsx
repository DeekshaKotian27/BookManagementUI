import React, { useContext, useState } from "react";
import Layout from "../Layout";
import ProfileSideBar from "../Component/ProfileSideBar";
import { YourAccountTab } from "../Component/YourAccountTab";
import UserList from "../Component/UserList";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";

const ProfilePage: React.FC = () => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  const [tabNum, setTabNum] = useState<number>(1);
  return (
    <div>
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ProfileSideBar setTabNum={setTabNum} />
          <div
            style={{
              padding: "10px",
              borderLeft: "1px solid",
              marginTop: "20px",
              width: "800px",
            }}
          >
            {tabNum === 1 && <YourAccountTab />}
            {loginData.role.toLocaleLowerCase() === "admin" && tabNum === 2 && (
              <UserList />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProfilePage;
