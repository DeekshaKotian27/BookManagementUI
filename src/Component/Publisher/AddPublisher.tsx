import React, { useEffect, useState } from "react";
import { Box, Button, Container, Modal, TextField } from "@mui/material";
import { NewPublisher, Publisher } from "../../Interface/Publisher";
import { addPublisher, updatePublisher } from "../../Services/PublisherService";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";
import MessageDialougeBox from "../MessageDialougeBox";

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
  const [apiMessagePopUp, setApiMessagePopup11] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<String>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleAPIMessagePopup = () => {
    console.log("API message popup closed"); // Debugging output
    setApiMessagePopup11(false);
    setShowAddPublisher(false);
  };

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
    let response;
      if (editPublisher) {
        response=await updatePublisher(editPublisher.publisherID, addPublisherData);
      } else {
        response=await addPublisher(addPublisherData);
      }
      if(response){
        setSuccess(response.success);
        setApiMessage(response.message);
        setApiMessagePopup11(true);
      }
      setAddPublisherData({
        publisherName: "",
        publisherAddress: "",
        publisherEmailId: "",
        publisherPhoneNumber: "",
      });
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
      <Modal open={apiMessagePopUp} onClose={handleAPIMessagePopup}>
        <div className="MessageBoxPopUp">
          <MessageDialougeBox
            apiMessage={apiMessage}
            setApiMessagePopup={setApiMessagePopup11}
            success={success}
            setShowPopup={setShowAddPublisher}
          />
        </div>
      </Modal>
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
