# Book Management System
This project is a Book Management System built using React TypeScript for the frontend. The system allows users to manage books, authors, categories, and publishers. Key features include:

- Login and Registration: 
Users can sign up or log in to access the system. The authentication state is managed globally and displayed in the header across all pages after login.

- Dashboard: 
A central hub for accessing different sections of the system, including managing books, authors, publishers, and categories.

- Author, Publisher, Category, and Book Pages: 
Each page provides detailed management capabilities for these entities. Users can add, edit, or view details related to authors, publishers, categories, and books.

- Responsive Design: 
The UI components such as sidebars, navigation, and lists are designed to be responsive, ensuring usability across various screen sizes.

- State Management: 
The application uses React hooks like useState and useEffect for managing local state and side effects. Routing is handled by React Router, and form data is managed with controlled components.

- Validation and Error Handling: 
Forms include basic validation and error handling, ensuring that users provide correct information before submitting data.

- Integration with Backend: 
The frontend interacts with a backend API ( built using .NET:[Book Management API](https://github.com/DeekshaKotian27/BookManagementAPI)) to fetch and manipulate data related to books, authors, etc.

- Authentication: 
Uses API Key Authentication passing in the header to authenticate the API endpoints.


## Getting Started with Create React App
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
