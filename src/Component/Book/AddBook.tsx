import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Container,
  Box,
  Modal,
} from "@mui/material";
import { Books, NewBook } from "../../Interface/Book";
import { addBooks, updateBook } from "../../Services/BookService";
import { getCategories } from "../../Services/CategoryService";
import { getPublishers } from "../../Services/PublisherService";
import { getAuthors } from "../../Services/AuthorService";
import { Author } from "../../Interface/Author";
import { Publisher } from "../../Interface/Publisher";
import { Category } from "../../Interface/Category";
import ModalHeader from "../ModalHeader";
import MessageDialougeBox from "../MessageDialougeBox";
import "../../App.css";

interface AddBookProps {
  setShowPopup: (show: boolean) => void;
  editBook: Books | null;
  setEditBook: (book: Books | null) => void;
}

const AddBook: React.FC<AddBookProps> = ({
  setShowPopup,
  editBook,
  setEditBook,
}) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    console.log("API message popup closed"); // Debugging output
    setApiMessagePopup11(false);
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const authorListResponse = await getAuthors();
      if (authorListResponse !== null && authorListResponse.success) {
        setAuthors(authorListResponse.data as Author[]);
      }

      const publisherResponse = await getPublishers();
      if(publisherResponse!=null && publisherResponse.success)
      {setPublishers(publisherResponse.data as Publisher[]);}

      const categoriesListResponse = await getCategories();
      if (categoriesListResponse !== null && categoriesListResponse.success) {
        setCategory(categoriesListResponse.data as Category[]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editBook) {
      setSelectedAuthor(editBook.authorId.toString());
      setSelectedCategory(editBook.categoryId.toString());
      setSelectedPublisher(editBook.publisherId.toString());
      setTitle(editBook.title);
    }
  }, [editBook]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newBook: NewBook = {
      title,
      authorId: parseInt(selectedAuthor),
      publisherId: parseInt(selectedPublisher),
      categoryId: parseInt(selectedCategory),
    };
    let response;
    if (editBook) {
      response = await updateBook(editBook.bookID, newBook);
    } else {
      response = await addBooks(newBook);
    }
    if(response){
      setSuccess(response.success);
      setApiMessage(response.message);
      setApiMessagePopup11(true);
    }
    setSelectedAuthor("");
    setSelectedCategory("");
    setSelectedPublisher("");
    setTitle("");
  };

  const handleCancel = () => {
    setShowPopup(false);
    setEditBook(null);
  };

  return (
    <div>
      <ModalHeader
        handleClose={handleCancel}
        heading={editBook ? "Edit Book" : "Add Book"}
      />
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setShowPopup}
          />
        </div>
      </Modal>
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <Container>
            <Box mt={2} mb={2}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                placeholder="Enter the Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="author-select-label">Author</InputLabel>
                <Select
                  labelId="author-select-label"
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  label="Author"
                  style={{ backgroundColor: "white" }}
                  //displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Author</em>
                  </MenuItem>
                  {authors.map((author) => (
                    <MenuItem
                      key={author.authorId}
                      value={author.authorId.toString()}
                    >
                      {author.firstName} {author.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="publisher-select-label">Publisher</InputLabel>
                <Select
                  labelId="publisher-select-label"
                  value={selectedPublisher}
                  onChange={(e) => setSelectedPublisher(e.target.value)}
                  style={{ backgroundColor: "white" }}
                  //displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Publisher</em>
                  </MenuItem>
                  {publishers.map((publisherData) => (
                    <MenuItem
                      key={publisherData.publisherID}
                      value={publisherData.publisherID.toString()}
                    >
                      {publisherData.publisherName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ backgroundColor: "white" }}
                  //displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {category.map((categoryData) => (
                    <MenuItem
                      key={categoryData.categoryID}
                      value={categoryData.categoryID.toString()}
                    >
                      {categoryData.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <Button
                type="submit"
                variant="outlined"
                style={{ backgroundColor: "green", color: "white" }}
              >
                {editBook ? "Update" : "Add"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
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

export default AddBook;
