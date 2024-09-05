import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Books } from "../Interface/Book";
import { getBooks } from "../Services/BookService";
import { getAuthors } from "../Services/AuthorService";
import { Author } from "../Interface/Author";
import { Publisher } from "../Interface/Publisher";
import { getPublishers } from "../Services/PublisherService";
import { Category } from "../Interface/Category";
import { getCategories } from "../Services/CategoryService";
import { useNavigate } from "react-router-dom";
import { LoginContext, LoginContextType } from "../ContextAPI/LoginContext";
import DashboardButton from "./DashboardButton";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { loginData } = useContext(LoginContext) as LoginContextType;
  const [books, setBooks] = useState<Books[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookListResponse = await getBooks();
        if (bookListResponse != null && bookListResponse.success) {
          setBooks(bookListResponse.data as Books[]);
        }
        const authorListResponse = await getAuthors();
        if (authorListResponse !== null && authorListResponse.success) {
          setAuthors(authorListResponse.data as Author[]);
        }
        const publisherResponse = await getPublishers();
        if (publisherResponse != null && publisherResponse.success) {
          setPublishers(publisherResponse.data as Publisher[]);
        }

        const categoriesListResponse = await getCategories();
        if (categoriesListResponse !== null && categoriesListResponse.success) {
          setCategory(categoriesListResponse.data as Category[]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <br />
      <h1>Welcome {loginData.userName}</h1>
      <div className="secondary-nav">
        <DashboardButton
          count={books.length}
          text={books.length !== 1 ? "Books" : "Book"}
        />
        <DashboardButton
          count={authors.length}
          text={authors.length !== 1 ? "Authors" : "Author"}
        />
        <DashboardButton
          count={publishers.length}
          text={publishers.length !== 1 ? "Publishers" : "Publisher"}
        />
        <DashboardButton
          count={category.length}
          text={category.length !== 1 ? "Categories" : "Category"}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          className="books-list"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <TableContainer>
            <Typography variant="h6">Books List</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell>Category</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={() => navigate("/book")}
              style={{ float: "right" }}
            >
              View More
            </Button>
          </TableContainer>
        </div>
        <div
          className="authors-list"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <TableContainer>
            <Typography variant="h6">Authors List</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Author ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authors.map((author) => (
                  <TableRow key={author.authorId}>
                    <TableCell>{author.authorId}</TableCell>
                    <TableCell>
                      {author.firstName} {author.lastName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              style={{ float: "right" }}
              onClick={() => navigate("/author")}
            >
              View More
            </Button>
          </TableContainer>
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          className="publisher-list"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <TableContainer>
            <Typography variant="h6">Publishers List</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Publisher ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publishers.map((publisher) => (
                  <TableRow key={publisher.publisherID}>
                    <TableCell>{publisher.publisherID}</TableCell>
                    <TableCell>{publisher.publisherName}</TableCell>
                    <TableCell>{publisher.publisherEmailId}</TableCell>
                    <TableCell>{publisher.publisherPhoneNumber}</TableCell>
                    <TableCell>{publisher.publisherAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={() => navigate("/publisher")}
              style={{ float: "right" }}
            >
              View More
            </Button>
          </TableContainer>
        </div>
        <div
          className="category-list"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <TableContainer>
            <Typography variant="h6">Category List</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category.map((categoryData) => (
                  <TableRow key={categoryData.categoryID}>
                    <TableCell>{categoryData.categoryID}</TableCell>
                    <TableCell>{categoryData.categoryName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={() => navigate("/category")}
              style={{ float: "right" }}
            >
              View More
            </Button>
          </TableContainer>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Dashboard;
