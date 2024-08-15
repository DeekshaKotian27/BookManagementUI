import React from "react";
import "../App.css";
import Layout from "../Layout";
import AuthorsList from "../Component/Author/AuthorsList";

const HomePage: React.FC = () => {
  //const [currentTab, setCurrentTab] = useState<string>("book");

  return (
    <div>
      <Layout>
        <AuthorsList />
      </Layout>
      {/* <div className="secondary-nav">
        <Button
          variant={currentTab === "book" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setCurrentTab("book")}
        >
          Books
        </Button>
        <Button
          variant={currentTab === "author" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setCurrentTab("author")}
        >
          Authors
        </Button>
        <Button
          variant={currentTab === "category" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setCurrentTab("category")}
        >
          Category
        </Button>
        <Button
          variant={currentTab === "publisher" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setCurrentTab("publisher")}
        >
          Publisher
        </Button>
      </div>
      {currentTab === "book" && (
        <div>
          <Book />
        </div>
      )}
      {currentTab === "author" && (
        <div>
          <AuthorsList />
        </div>
      )}
      {currentTab === "category" && (
        <div>
          <CategoryList />
        </div>
      )}
      {currentTab === "publisher" && (
        <div>
          <PublishersList />
        </div>
      )} */}
    </div>
  );
};

export default HomePage;
