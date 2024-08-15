import React, { useEffect, useState } from "react";
import { Author } from "../../Interface/Author";
import { getAuthorByID } from "../../Services/AuthorService";
import { Typography } from "@mui/material";
import "../../CSS/StylePages.css";
import ModalHeader from "../ModalHeader";

interface AuthorDetailProps {
  AuthorId: number | null;
  setAuthorId: (id: number | null) => void;
}

const AuthorDetail: React.FC<AuthorDetailProps> = ({
  AuthorId,
  setAuthorId,
}) => {
  const [authorDetail, setAuthorDetail] = useState<Author>();
  useEffect(() => {
    const fetchData = async () => {
      if (AuthorId) {
        var data = await getAuthorByID(AuthorId);
        setAuthorDetail(data);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setAuthorId(null);
  };
  console.log("Author Detail", authorDetail);
  return (
    <div>
      <ModalHeader handleClose={handleClose} heading="Details" />
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
