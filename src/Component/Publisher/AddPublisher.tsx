import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { NewPublisher, Publisher } from "../../Interface/Publisher";
import { addPublisher, updatePublisher } from "../../Services/PublisherService";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";

interface AddPublisherProps {
  setShowAddPublisher: (show: boolean) => void;
  editPublisher: Publisher | null;
  setEditPublisher: (publisher: Publisher | null) => void;
}

const AddPublisher: React.FC<AddPublisherProps> = ({
  setShowAddPublisher,
  editPublisher,
  setEditPublisher,
}) => {
  const [addPublisherData, setAddPublisherData] = useState<NewPublisher>({
    publisherName: "",
    publisherAddress: "",
    publisherEmailId: "",
    publisherPhoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddPublisherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (editPublisher) {
      setAddPublisherData({
        publisherName: editPublisher?.publisherName,
        publisherAddress: editPublisher?.publisherAddress,
        publisherEmailId: editPublisher?.publisherEmailId,
        publisherPhoneNumber: editPublisher?.publisherPhoneNumber,
      });
    }
  }, [editPublisher]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editPublisher) {
        await updatePublisher(editPublisher.publisherID, addPublisherData);
      } else {
        await addPublisher(addPublisherData);
      }
      setAddPublisherData({
        publisherName: "",
        publisherAddress: "",
        publisherEmailId: "",
        publisherPhoneNumber: "",
      });
      setShowAddPublisher(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };
  const handleCancel = () => {
    setShowAddPublisher(false);
    setEditPublisher(null);
  };
  return (
    <div>
      <ModalHeader
        handleClose={handleCancel}
        heading={editPublisher ? "Edit Publisher" : "Add Publisher"}
      />
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <Container maxWidth="sm">
            <Box mb={2} mt={2}>
              <TextField
                required
                label="Publisher Name"
                name="publisherName"
                value={addPublisherData.publisherName}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              ></TextField>
            </Box>
            <Box mb={2}>
              <TextField
                required
                label="Email ID"
                name="publisherEmailId"
                type="email"
                value={addPublisherData.publisherEmailId}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              ></TextField>
            </Box>
            <Box mb={2}>
              <TextField
                label="Phone No."
                name="publisherPhoneNumber"
                value={addPublisherData.publisherPhoneNumber}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              ></TextField>
            </Box>
            <Box mb={2}>
              <TextField
                label="Address"
                name="publisherAddress"
                value={addPublisherData.publisherAddress}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ backgroundColor: "white" }}
              ></TextField>
            </Box>
            <Box mb={2}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ backgroundColor: "green", color: "white" }}
              >
                {editPublisher ? "Update" : "Add"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ backgroundColor: "red", color: "white" }}
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

export default AddPublisher;
