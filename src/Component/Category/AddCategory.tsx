import { Box, Button, Container, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Category, NewCategory } from "../../Interface/Category";
import { addCategory, updateCategory } from "../../Services/CategoryService";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";
import MessageDialougeBox from "../MessageDialougeBox";

interface AddCategoryProps {
  setShowAddCategory: (show: boolean) => void;
  editCategory: Category | null;
  setEditCategory: (category: Category | null) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({
  setShowAddCategory,
  editCategory,
  setEditCategory,
}) => {
  const [AddCategory, setAddCategory] = useState<NewCategory>({
    categoryName: "",
  });
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    console.log("API message popup closed"); // Debugging output
    setApiMessagePopup11(false);
    setShowAddCategory(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (editCategory) {
      setAddCategory({ categoryName: editCategory.categoryName });
    }
  }, [editCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    if (editCategory) {
      response = await updateCategory(editCategory.categoryID, AddCategory);
    } else {
      response = await addCategory(AddCategory);
    }
    if (response) {
      setSuccess(response.success);
      setApiMessage(response.message);
      setApiMessagePopup11(true);
    }
    setAddCategory({ categoryName: "" });
  };
  const handleCancel = () => {
    setShowAddCategory(false);
    setEditCategory(null);
  };

  return (
    <div>
      <ModalHeader
        handleClose={handleCancel}
        heading={editCategory ? "Edit Category" : "Add Category"}
      />
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setShowAddCategory}
          />
        </div>
      </Modal>
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <Box mb={2} mt={2}>
              <TextField
                label="Category Name"
                name="categoryName"
                value={AddCategory.categoryName}
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
                sx={{ backgroundColor: "green", color: "white" }}
              >
                {editCategory ? "Update" : "Add"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ backgroundColor: "red", color: "white" }}
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

export default AddCategory;
