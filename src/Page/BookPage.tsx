import React from "react";
import Layout from "../Layout";
import BooksList from "../Component/Book/BooksList";

const BookPage = () => {
  return (
    <div>
      <Layout>
        <BooksList />
      </Layout>
    </div>
  );
};

export default BookPage;
