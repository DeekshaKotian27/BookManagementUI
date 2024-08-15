import React, { useEffect, useState } from "react";
import { getPublisherByID } from "../../Services/PublisherService";
import { Publisher } from "../../Interface/Publisher";
import { Typography } from "@mui/material";
import ModalHeader from "../ModalHeader";

interface PublisherDetailProps {
  publisherId: number | null;
  setPublisherId: (id: number | null) => void;
}

const PublisherDetail: React.FC<PublisherDetailProps> = ({
  publisherId,
  setPublisherId,
}) => {
  const [publisherData, setPublisherData] = useState<Publisher>();

  useEffect(() => {
    const fetchData = async () => {
      if (publisherId) {
        var data = await getPublisherByID(publisherId);
        setPublisherData(data);
      } else {
        console.log("invalid publisher ID");
      }
    };
    fetchData();
  }, []);
  const handleClose = () => {
    setPublisherId(null);
  };
  console.log(publisherData);
  return (
    <div>
      <ModalHeader handleClose={handleClose} heading="Details" />
      <div className="add-form">
        <h1>{publisherData?.publisherName}</h1>
        {publisherData?.books.map((data) => (
          <div className="detail">
            <Typography variant="h6">{data.title}</Typography>
            <p>Author:{data.authorName}</p>
            <p>Category:{data.categoryName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublisherDetail;
