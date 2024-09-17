import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { User } from "../Interface/Users";
import { GetUsersList, RemoveUser } from "../Services/UserService";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import YesNoDialougeBox from "./YesNoDialougeBox";
import MessageDialougeBox from "./MessageDialougeBox";
import SearchTextField from "./SearchTextField";
import AddButton from "./AddButton";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";

const UserList: React.FC = () => {
  const { loginData } = useContext(LoginContext) as LoginContextType;
  const [userList, setUserList] = useState<User[]>([]);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [apiMessagePopUp, setApiMessagePopup] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [id, setId] = useState<number>(-1);
  const [success, setSuccess] = useState<boolean>(false);
  const [user,setUser]=useState<User>();
  
  const handleDeletePopup = () => {
    setDeletePopup(false);
  };
  const handleAPIMessagePopup = () => {
    setApiMessagePopup(false);
  };
  const handleSetAddUser=()=>{
    setAddUser(false);
    setUser({
      userId: -1,
      emailID: "",
      password: "",
      userName: "",
      role: "",
    });
  }

  const fetchData = async () => {
    var response = await GetUsersList();
    if (response && response.success) {
      var data = response.data as User[];
      const newList = data.filter((user) => user.userId !== loginData.userId);
      setUserList(newList);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (id: number) => {
    var deleteData = await RemoveUser(id);
    setSuccess(deleteData.success);
    setApiMessage(deleteData.message);
    setDeletePopup(false);
    setApiMessagePopup(true);
    fetchData();
  };
  return (
    <div>
      {/* Confirm Delete pop up */}
      <Modal open={deletePopup} onClose={handleDeletePopup}>
        <div className="MessageBoxPopUp">
          <YesNoDialougeBox
            Id={id}
            handleDelete={handleDelete}
            setDeletePopup={setDeletePopup}
          />
        </div>
      </Modal>
      {/*Api Message popUp */}
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup}
            success={success}
          />
        </div>
      </Modal>
      <Modal open={addUser} onClose={handleSetAddUser}>
        <div style={{backgroundColor:"white",width:"fit-Content",padding:"15px",position:"absolute",top:"150px",right:"40%"}}>
            <SignUpComponent setIsLogin={setAddUser} text="Register" editUser={user} handleUserAddedOrUpdated={fetchData}/>
        </div>
      </Modal>
      <Typography variant="h5">User List</Typography>
      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
        <SearchTextField/>
        <AddButton text="Add User" handleOnClick={()=>setAddUser(true)}/></div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email Address</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.emailID}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={()=>{setUser(user);setAddUser(true)}}>Edit</Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setDeletePopup(true);
                    setId(user.userId);
                  }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
