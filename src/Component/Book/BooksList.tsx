import React, { useEffect, useState } from "react";
import type { Books } from "../../Interface/Book";
import { deleteBook, getBooks } from "../../Services/BookService";
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
import AddBook from "./AddBook";
import "../../App.css";
import AddButton from "../AddButton";
import SearchTextField from "../SearchTextField";
import YesNoDialougeBox from "../YesNoDialougeBox";
import MessageDialougeBox from "../MessageDialougeBox";

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<Books | null>(null);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [apiMessagePopUp,setApiMessagePopup]=useState<boolean>(false);
  const [apiMessage,setApiMessage]=useState<String>("");
  const [id,setId]=useState<number>(-1);
  const [success, setSuccess] = useState<boolean>(false);

  const handlePopupClose = () => {
    setShowPopup(false);
    setEditBook(null);
  };
  const handleDeletePopup = () => {
    setDeletePopup(false);
  };
  const handleAPIMessagePopup=()=>{setApiMessagePopup(false)}

  useEffect(() => {
    const fetchData = async () => {
      const bookListResponse = await getBooks();
      if (bookListResponse != null && bookListResponse.success) {
        setBooks(bookListResponse.data as Books[]);
      }
    };

    fetchData();
  }, [books]);

  const handleDelete = async (id: number) => {
    var deleteData=await deleteBook(id);
    setSuccess(deleteData.success);
    setApiMessage(deleteData.message);
    setDeletePopup(false);
    setApiMessagePopup(true)
  };
  const handleEdit = (book: Books) => {
    setShowPopup(true);
    setEditBook({
      bookID: book.bookID,
      authorId: book.authorId,
      authorName: book.authorName,
      title: book.title,
      categoryId: book.categoryId,
      categoryName: book.categoryName,
      publisherId: book.publisherId,
      publisherName: book.publisherName,
    });
  };
  return (
    <div>
      <br />
      <Typography variant="h4" component="h1">
        Books List
      </Typography>
      <div className="list-search-add">
        <SearchTextField />

        <AddButton handleOnClick={() => setShowPopup(true)} text="Add Book" />
      </div>
      {/* ADD/Edit pop up */}
      <Modal open={showPopup} onClose={handlePopupClose}>
        <div className="popUp">
          <AddBook
            setShowPopup={setShowPopup}
            editBook={editBook}
            setEditBook={setEditBook}
          />
        </div>
      </Modal>
      {/* Confirm Delete pop up */}
      <Modal open={deletePopup} onClose={handleDeletePopup}>
        <div className="MessageBoxPopUp">
          <YesNoDialougeBox Id={id} handleDelete={handleDelete}
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
        <Table stickyHeader aria-label="book table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Book ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Publisher</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((bookData) => (
              <TableRow key={bookData.bookID}>
                <TableCell>{bookData.bookID}</TableCell>
                <TableCell>{bookData.title}</TableCell>
                <TableCell>{bookData.authorName}</TableCell>
                <TableCell>{bookData.publisherName}</TableCell>
                <TableCell>{bookData.categoryName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(bookData)}
                    variant="outlined"
                    color="secondary"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>{ setDeletePopup(true);setId(bookData.bookID)}}
                    variant="outlined"
                    color="error"
                    sx={{ mr: 1 }}
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

export default BooksList;
