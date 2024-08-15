import React, { useEffect, useState } from "react";
import type { Category } from "../../Interface/Category";
import { deleteCategory, getCategories } from "../../Services/CategoryService";
import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddCategory from "./AddCategory";
import "../../CSS/StylePages.css";
import CategoryDetail from "./CategoryDetail";
import AddButton from "../AddButton";
import SearchTextField from "../SearchTextField";

const CategoryList: React.FC = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categoryId, setCategoryID] = useState<number | null>(null);
  const handleClosePopup = () => setShowAddCategory(false);
  const handleDetailClosePopup = () => setCategoryID(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategories();
        setCategory(result);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    window.location.reload();
  };

  const handleEdit = (category: Category) => {
    setShowAddCategory(true);
    setEditCategory(category);
  };

  return (
    <div>
      <br />
      <Typography variant="h4" component="h1">
        Category List
      </Typography>
      <div className="list-search-add">
        <SearchTextField />

        <AddButton
          handleOnClick={() => setShowAddCategory(true)}
          text="Add Category"
        />
      </div>

      <Modal open={showAddCategory} onClose={handleClosePopup}>
        <div className="popUp">
          <AddCategory
            setShowAddCategory={setShowAddCategory}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
          />
        </div>
      </Modal>
      <Modal open={categoryId ? true : false} onClose={handleDetailClosePopup}>
        <div className="popUp">
          <CategoryDetail
            categoryId={categoryId}
            setCategoryID={setCategoryID}
          />
        </div>
      </Modal>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, textAlignLast: "center" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Category ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((categoryData) => (
              <TableRow key={categoryData.categoryID}>
                <TableCell>{categoryData.categoryID}</TableCell>
                <TableCell>{categoryData.categoryName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => setCategoryID(categoryData.categoryID)}
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleEdit(categoryData)}
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(categoryData.categoryID)}
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryList;
