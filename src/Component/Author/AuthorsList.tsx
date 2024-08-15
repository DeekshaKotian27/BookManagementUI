import React, { useEffect, useState } from "react";
import type { Author } from "../../Interface/Author";
import { deleteAuthor, getAuthors } from "../../Services/AuthorService";
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
import AddAuthor from "./AddAuthor";
import AuthorDetail from "./AuthorDetail";
import "../../CSS/StylePages.css";
import AddButton from "../AddButton";
import SearchTextField from "../SearchTextField";

const AuthorsList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showAddAuthor, setShowAddAuthor] = useState<boolean>(false);
  const [editAuthor, setEditAuthor] = useState<Author | null>(null);
  const [AuthorId, setAuthorId] = useState<number | null>(null);
  const handleAddAuthorPopupClose = () => setShowAddAuthor(false);
  const handleAuthorDetailPopup = () => setAuthorId(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAuthors();
        setAuthors(result);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteAuthor(id);
    window.location.reload();
  };

  const handleEdit = (author: Author) => {
    setShowAddAuthor(true);
    setEditAuthor(author);
  };

  return (
    <div>
      <br />
      <Typography variant="h4" component="h1">
        Authors List
      </Typography>
      <div className="list-search-add">
        <SearchTextField />
        <AddButton
          handleOnClick={() => setShowAddAuthor(true)}
          text=" Add Author"
        />
      </div>
      <Modal open={showAddAuthor} onClose={handleAddAuthorPopupClose}>
        <div className="popUp">
          <AddAuthor
            setShowAddAuthor={setShowAddAuthor}
            editAuthor={editAuthor}
            setEditAuthor={setEditAuthor}
          />
        </div>
      </Modal>
      <Modal open={AuthorId ? true : false} onClose={handleAuthorDetailPopup}>
        <div className="popUp">
          <AuthorDetail AuthorId={AuthorId} setAuthorId={setAuthorId} />
        </div>
      </Modal>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 440, textAlignLast: "center" }}
      >
        <Table stickyHeader aria-label="author table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Author ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.authorId} hover>
                <TableCell>{author.authorId}</TableCell>
                <TableCell>
                  {author.firstName} {author.lastName}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setAuthorId(author.authorId)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEdit(author)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(author.authorId)}
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

export default AuthorsList;
