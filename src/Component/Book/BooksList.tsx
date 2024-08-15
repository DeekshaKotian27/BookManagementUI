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

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<Books | null>(null);
  const handlePopupClose = () => {
    setShowPopup(false);
    setEditBook(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBooks();
        setBooks(result);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    window.location.reload();
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
      <Modal open={showPopup} onClose={handlePopupClose}>
        <div className="popUp">
          <AddBook
            setShowPopup={setShowPopup}
            editBook={editBook}
            setEditBook={setEditBook}
          />
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
                    onClick={() => handleDelete(bookData.bookID)}
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
