import React, { useEffect, useState } from "react";
import { getPublisherByID } from "../../Services/PublisherService";
import { Publisher } from "../../Interface/Publisher";
import { Typography } from "@mui/material";
import ModalHeader from "../ModalHeader";

interface PublisherDetailProps {
  publisherId: number;
  setshowPublisherDetail: (show: boolean) => void;
}

const PublisherDetail: React.FC<PublisherDetailProps> = ({
  publisherId,
  setshowPublisherDetail,
}) => {
  const [publisherData, setPublisherData] = useState<Publisher>();

  useEffect(() => {
    const fetchData = async () => {
        var data = await getPublisherByID(publisherId);
        if(data!=null && data.success){
          setPublisherData(data.data as Publisher)
        }
    };
    fetchData();
  }, []);
  
  console.log(publisherData);
  return (
    <div>
      <ModalHeader handleClose={()=>setshowPublisherDetail(false)} heading="Details" />
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
