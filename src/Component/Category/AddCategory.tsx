import { Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Category, NewCategory } from "../../Interface/Category";
import { addCategory, updateCategory } from "../../Services/CategoryService";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";

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
    try {
      if (editCategory) {
        await updateCategory(editCategory.categoryID, AddCategory);
        setAddCategory({ categoryName: "" });
        setShowAddCategory(false);
        window.location.reload();
      } else {
        await addCategory(AddCategory);
        setAddCategory({ categoryName: "" });
        setShowAddCategory(false);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
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
