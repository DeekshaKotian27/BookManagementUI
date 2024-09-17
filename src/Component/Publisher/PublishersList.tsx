import React, { useEffect, useState } from "react";
import type { Publisher } from "../../Interface/Publisher";
import {
  deletePublisher,
  getPublishers,
} from "../../Services/PublisherService";
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
import AddPublisher from "./AddPublisher";
import "../../CSS/StylePages.css";
import PublisherDetail from "./PublisherDetail";
import AddButton from "../AddButton";
import SearchTextField from "../SearchTextField";
import YesNoDialougeBox from "../YesNoDialougeBox";
import MessageDialougeBox from "../MessageDialougeBox";

const PublishersList = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [showAddPublisher, setShowAddPublisher] = useState<boolean>(false);
  const [editPublisher, setEditPublisher] = useState<Publisher | null>(null);
  const [publisherId, setPublisherId] = useState<number>(-1);
  const [showPublisherDetail,setshowPublisherDetail]=useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [apiMessagePopUp,setApiMessagePopup]=useState<boolean>(false);
  const [apiMessage,setApiMessage]=useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleClosePopUp = () => setShowAddPublisher(false);
  const handleCloseDetailPopUp = () => setshowPublisherDetail(false);
  const handleDeletePopup=()=>setDeletePopup(false);
  const handleAPIMessagePopup=()=>setApiMessagePopup(false);

  useEffect(() => {
    const fetchData = async () => {
        const result = await getPublishers();
        if (result != null && result.success) {
          setPublishers(result.data as Publisher[]);
        }
      
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    var deleteData=await deletePublisher(id);
    setSuccess(deleteData.success);
    setApiMessage(deleteData.message);
    setDeletePopup(false);
    setApiMessagePopup(true)
  };

  const handleEdit = (publisher: Publisher) => {
    setShowAddPublisher(true);
    setEditPublisher(publisher);
  };

  return (
    <div>
      <br />
      <Typography variant="h4" component="h1">
        Publishers List
      </Typography>
      <div className="list-search-add">
        <SearchTextField />
        <AddButton
          handleOnClick={() => setShowAddPublisher(true)}
          text="Add Publisher"
        />
      </div>
      <Modal open={showAddPublisher} onClose={handleClosePopUp}>
        <div className="popUp">
          <AddPublisher
            setShowAddPublisher={setShowAddPublisher}
            editPublisher={editPublisher}
            setEditPublisher={setEditPublisher}
          />
        </div>
      </Modal>
      <Modal open={showPublisherDetail} onClose={handleCloseDetailPopUp}>
        <div className="popUp">
          <PublisherDetail
            publisherId={publisherId}
            setshowPublisherDetail={setshowPublisherDetail}
          />
        </div>
      </Modal>

{/* Confirm Delete pop up */}
<Modal open={deletePopup} onClose={handleDeletePopup}>
        <div className="MessageBoxPopUp">
          <YesNoDialougeBox Id={publisherId} handleDelete={handleDelete}
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
              <TableCell sx={{ fontWeight: "bold" }}>Publisher ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell></TableCell>
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
                <TableCell>
                  <Button
                    onClick={() => {setshowPublisherDetail(true);setPublisherId(publisher.publisherID)}}
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleEdit(publisher)}
                    variant="outlined"
                    color="secondary"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {setDeletePopup(true);setPublisherId(publisher.publisherID)}}
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

export default PublishersList;
