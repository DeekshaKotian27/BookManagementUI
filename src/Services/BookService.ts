import axios, { AxiosError } from "axios";
import { Books, NewBook } from "../Interface/Book";
import { ValidationResponse } from "../Interface/ValidationResponse";
import { handleAxiosError } from "./ErrorResponse";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE = process.env.REACT_APP_API_KEY_VALUE;
const token = localStorage.getItem("JWTToken");
console.log(token)
export const getBooks = async (): Promise<ValidationResponse> => {
  try {
    const response = await axios.get<Books[]>(`${API_URL}/Books/GetAllBooks`, {
      headers: {
        [API_KEY!]: API_KEY_VALUE!,
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: "Successfull",
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return handleAxiosError(error as AxiosError);
  }
};

export const addBooks = async (book: NewBook): Promise<ValidationResponse> => {
  try {
    await axios.post<NewBook>(`${API_URL}/Books/CreateBook`, book, {
      headers: {
        [API_KEY!]: API_KEY_VALUE!,
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: "Author added successfully",
    };
  } catch (error) {
    console.error("Error creating books:", error);
    return handleAxiosError(error as AxiosError);
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: NewBook
): Promise<ValidationResponse> => {
  try {
    await axios.put(`${API_URL}/Books/UpdateBook/${bookId}`, updatedBook, {
      headers: {
        [API_KEY!]: API_KEY_VALUE!,
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, message: "Successfully Updated" };
  } catch (error) {
    console.error("Error updating book:", error);
    return handleAxiosError(error as AxiosError);
  }
};

export const deleteBook = async (bookId: number): Promise<ValidationResponse> => {
  try {
    await axios.delete(`${API_URL}/Books/DeleteBook/${bookId}`, {
      headers: {
        [API_KEY!]: API_KEY_VALUE!,
        Authorization: `Bearer ${token}`,
      },
    });
    return {
        success:true,
        message:"Deleted successfully"
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    return handleAxiosError(error as AxiosError);
  }
};
