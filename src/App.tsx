import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorPage from "./Page/AuthorPage";
import LoginPage from "./Page/LoginPage";
import DashboardPage from "./Page/DashboardPage";
import PublisherPage from "./Page/PublisherPage";
import CategoryPage from "./Page/CategoryPage";
import BookPage from "./Page/BookPage";
import ProtectedRoute from "./Component/ProtectedRoute";
import ErrorPage from "./Page/ErrorPage";
import ProfilePage from "./Page/ProfilePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/publisher" element={<PublisherPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/book" element={<BookPage />} /> */}

          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/author"
            element={
              <ProtectedRoute>
                <AuthorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publisher"
            element={
              <ProtectedRoute>
                <PublisherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Myprofile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
