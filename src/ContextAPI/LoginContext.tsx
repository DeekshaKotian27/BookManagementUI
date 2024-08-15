import React, { createContext, useEffect, useState } from "react";
import { User } from "../Interface/Users";

export interface LoginContextType {
  loginData: User;
  setLoginData: (data: User) => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

interface ProviderProps {
  children: React.ReactNode;
}
const LoginContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [loginData, setLoginData] = useState<User>(() => {
    const data = localStorage.getItem("loginData");
    return data
      ? JSON.parse(data)
      : { emailId: "", userName: "", password: "" };
  });

  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify(loginData));
  }, [loginData]);
  return (
    <div>
      <LoginContext.Provider value={{ loginData, setLoginData }}>
        {children}
      </LoginContext.Provider>
    </div>
  );
};

export default LoginContextProvider;
