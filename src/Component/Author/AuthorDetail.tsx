import React, { useEffect, useState } from "react";
import { Author } from "../../Interface/Author";
import { getAuthorByID } from "../../Services/AuthorService";
import { Typography } from "@mui/material";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";

interface AuthorDetailProps {
  AuthorId: number;
  setShowAuthorDetail: (show:boolean) => void;
}

const AuthorDetail: React.FC<AuthorDetailProps> = ({
  AuthorId,
  setShowAuthorDetail,
}) => {
  const [authorDetail, setAuthorDetail] = useState<Author>();
  useEffect(() => {
    const fetchData = async () => {
        var data = await getAuthorByID(AuthorId);
        if(data!=null && data.success){
          setAuthorDetail(data.data as Author);
      }
    };
    fetchData();
  }, []);

  
  console.log("Author Detail", authorDetail);
  return (
    <div>
      <ModalHeader handleClose={()=>setShowAuthorDetail(false)} heading="Details" />
      <div className="add-form">
        <h1>
          {authorDetail?.firstName} {authorDetail?.lastName}
        </h1>
        {authorDetail?.books.length === 0 ? (
          <Typography>The Author has no books!!</Typography>
        ) : (
          <div>
            {authorDetail?.books.map((book) => (
              <div className="detail">
                <Typography variant="h6">{book.title}</Typography>
                <p>Category:{book.categoryName}</p>
                <p>Publisher:{book.publisherName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetail;
