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
import YesNoDialougeBox from "../YesNoDialougeBox";
import MessageDialougeBox from "../MessageDialougeBox";

const CategoryList: React.FC = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categoryId, setCategoryID] = useState<number>(-1);
  const [showCategoryDetail,setShowCategoryDetail]=useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [apiMessagePopUp,setApiMessagePopup]=useState<boolean>(false);
  const [apiMessage,setApiMessage]=useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleClosePopup = () => setShowAddCategory(false);
  const handleDetailClosePopup = () => setShowCategoryDetail(false);
  const handleDeletePopup=()=>setDeletePopup(false);
  const handleAPIMessagePopup=()=>setApiMessagePopup(false);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesListResponse = await getCategories();
        if(categoriesListResponse!==null && categoriesListResponse.success)
        {setCategory(categoriesListResponse.data as Category[]);}
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    var deleteData=await deleteCategory(id);
    setSuccess(deleteData.success);
    setApiMessage(deleteData.message);
    setDeletePopup(false);
    setApiMessagePopup(true)
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
      <Modal open={showCategoryDetail} onClose={handleDetailClosePopup}>
        <div className="popUp">
          <CategoryDetail
            categoryId={categoryId}
            setShowCategoryDetail={setShowCategoryDetail}
          />
        </div>
      </Modal>

       {/* Confirm Delete pop up */}
       <Modal open={deletePopup} onClose={handleDeletePopup}>
        <div className="MessageBoxPopUp">
          <YesNoDialougeBox Id={categoryId} handleDelete={handleDelete}
           setDeletePopup={setDeletePopup}/>
        </div>
      </Modal>
      {/*Api Message popUp */}
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div  className="MessageBoxPopUp">
          <MessageDialougeBox apiMessage={apiMessage} setApiMessagePopup={setApiMessagePopup} success={success}/>
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
                    onClick={() => {setShowCategoryDetail(true);setCategoryID(categoryData.categoryID)}}
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
                    onClick={() =>{ setDeletePopup(true);setCategoryID(categoryData.categoryID)}}
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
