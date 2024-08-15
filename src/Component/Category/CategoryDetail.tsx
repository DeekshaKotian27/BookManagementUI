import React, { useEffect, useState } from "react";
import { Category } from "../../Interface/Category";
import { getCategoryByID } from "../../Services/CategoryService";
import { Typography } from "@mui/material";
import ModalHeader from "../ModalHeader";

interface CategoryDetailProps {
  categoryId: number | null;
  setCategoryID: (id: number | null) => void;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({
  categoryId,
  setCategoryID,
}) => {
  const [categoryDetail, setCategoryDetail] = useState<Category>();

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        var data = await getCategoryByID(parseInt("1"));
        setCategoryDetail(data);
      } else {
        console.log("ivalid id");
      }
    };
    fetchData();
  }, []);
  const handleClose = () => {
    setCategoryID(null);
  };
  console.log(categoryDetail);
  return (
    <div>
      <ModalHeader handleClose={handleClose} heading="Details" />
      <div className="add-form">
        <h1>{categoryDetail?.categoryName}</h1>
        {categoryDetail?.books.length === 0 ? (
          <Typography>No Books under this Category!</Typography>
        ) : (
          <div>
            {categoryDetail?.books.map((category) => (
              <div className="detail">
                <Typography variant="h6">{category.title}</Typography>
                <p>Author:{category.authorName}</p>
                <p>Publisher:{category.publisherName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
