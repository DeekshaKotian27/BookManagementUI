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
import YesNoDialougeBox from "../YesNoDialougeBox";
import MessageDialougeBox from "../MessageDialougeBox";

const AuthorsList: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showAddAuthor, setShowAddAuthor] = useState<boolean>(false);
  const [editAuthorData, setEditAuthorData] = useState<Author | null>(null);
  const [AuthorId, setAuthorId] = useState<number>(-1);
  const [showAuthorDetail, setShowAuthorDetail] = useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [apiMessagePopUp,setApiMessagePopup]=useState<boolean>(false);
  const [apiMessage,setApiMessage]=useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddAuthorPopupClose = () => setShowAddAuthor(false);
  const handleAuthorDetailPopup = () => setShowAuthorDetail(false);
  const handleDeletePopup=()=>setDeletePopup(false);
  const handleAPIMessagePopup=()=>setApiMessagePopup(false);

  useEffect(() => {
    const fetchData = async () => {
        const authorListResponse = await getAuthors();
        if(authorListResponse!==null && authorListResponse.success){
          setAuthors(authorListResponse.data as Author[]);
        }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    var deleteData=await deleteAuthor(id);
    setSuccess(deleteData.success);
    setApiMessage(deleteData.message);
    setDeletePopup(false);
    setApiMessagePopup(true)
  };

  const handleEdit = (author: Author) => {
    setShowAddAuthor(true);
    setEditAuthorData(author);
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
            editAuthor={editAuthorData}
            setEditAuthor={setEditAuthorData}
          />
        </div>
      </Modal>
      <Modal open={showAuthorDetail} onClose={handleAuthorDetailPopup}>
        <div className="popUp">
          <AuthorDetail AuthorId={AuthorId} setShowAuthorDetail={setShowAuthorDetail}/>
        </div>
      </Modal>
      {/* Confirm Delete pop up */}
      <Modal open={deletePopup} onClose={handleDeletePopup}>
        <div className="MessageBoxPopUp">
          <YesNoDialougeBox Id={AuthorId} handleDelete={handleDelete}
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
                    onClick={() => {setShowAuthorDetail(true);setAuthorId(author.authorId)}}
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
                    onClick={() =>{ setDeletePopup(true);setAuthorId(author.authorId)}}
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
