import { Box, Button, Container, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Author, newAuthor } from "../../Interface/Author";
import { addAuthors, updateAuthor } from "../../Services/AuthorService";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";
import MessageDialougeBox from "../MessageDialougeBox";

interface AddAuthorProps {
  setShowAddAuthor: (show: boolean) => void;
  editAuthor: Author | null;
  setEditAuthor: (author: Author | null) => void;
}

const AddAuthor: React.FC<AddAuthorProps> = ({
  setShowAddAuthor,
  editAuthor,
  setEditAuthor,
}) => {
  const [addAuthor, setAddAuthor] = useState<newAuthor>({
    firstName: "",
    lastName: "",
  });
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    console.log("API message popup closed"); // Debugging output
    setApiMessagePopup11(false);
    setShowAddAuthor(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddAuthor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (editAuthor) {
      setAddAuthor({
        firstName: editAuthor.firstName,
        lastName: editAuthor.lastName,
      });
    }
  }, [editAuthor]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
      if (editAuthor) {
        response=await updateAuthor(editAuthor.authorId, addAuthor);
      } else {
        response=await addAuthors(addAuthor);
      }
      if(response){
        setSuccess(response.success);
        setApiMessage(response.message);
        setApiMessagePopup11(true);
      }
       setAddAuthor({ firstName: "", lastName: "" });
  };

  const handleCancel = () => {
    setShowAddAuthor(false);
    setEditAuthor(null);
  };

  return (
    <div>
      <ModalHeader
        handleClose={handleCancel}
        heading={editAuthor ? "Edit Author" : "Add Author"}
      />
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setShowAddAuthor}
          />
        </div>
      </Modal>
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <Box mt={2} mb={2}>
              <TextField
                label="First Name"
                name="firstName"
                value={addAuthor.firstName}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              ></TextField>
            </Box>
            <Box mb={2}>
              <TextField
                label="Last Name"
                name="lastName"
                value={addAuthor.lastName}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              ></TextField>
            </Box>
            <Box mb={2}>
              <Button
                type="submit"
                variant="outlined"
                style={{ backgroundColor: "green", color: "white" }}
              >
                {editAuthor ? "Update" : "Add"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                style={{ backgroundColor: "red", color: "white" }}
              >
                Cancel
              </Button>
            </Box>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
