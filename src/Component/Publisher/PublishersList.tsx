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

const PublishersList = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [showAddPublisher, setShowAddPublisher] = useState<boolean>(false);
  const [editPublisher, setEditPublisher] = useState<Publisher | null>(null);
  const [publisherId, setPublisherId] = useState<number | null>(null);
  const handleClosePopUp = () => setShowAddPublisher(false);
  const handleCloseDetailPopUp = () => setPublisherId(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPublishers();
        setPublishers(result);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deletePublisher(id);
    window.location.reload();
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
      <Modal open={publisherId ? true : false} onClose={handleCloseDetailPopUp}>
        <div className="popUp">
          <PublisherDetail
            publisherId={publisherId}
            setPublisherId={setPublisherId}
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
                    onClick={() => setPublisherId(publisher.publisherID)}
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
                    onClick={() => handleDelete(publisher.publisherID)}
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
