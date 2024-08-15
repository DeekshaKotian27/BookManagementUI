import { Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Author, newAuthor } from "../../Interface/Author";
import { addAuthors, updateAuthor } from "../../Services/AuthorService";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";

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
    try {
      if (editAuthor) {
        await updateAuthor(editAuthor.authorId, addAuthor);
        setAddAuthor({ firstName: "", lastName: "" });
        setShowAddAuthor(false);
        window.location.reload();
      } else {
        await addAuthors(addAuthor);
        setAddAuthor({ firstName: "", lastName: "" });
        setShowAddAuthor(false);
        window.location.reload();
      }
    } catch (e) {
      console.error("error adding author");
    }
  };

  const handleDelete = () => {
    setShowAddAuthor(false);
    setEditAuthor(null);
  };

  const handleClose = () => {
    setShowAddAuthor(false);
  };

  return (
    <div>
      <ModalHeader
        handleClose={handleClose}
        heading={editAuthor ? "Edit Author" : "Add Author"}
      />
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
                onClick={handleDelete}
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
