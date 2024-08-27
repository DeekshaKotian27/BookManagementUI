import axios from "axios";
import {Books,NewBook} from '../Interface/Book';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;

export const getBooks= async():Promise<Books[]>=>{
    try{
        const response= await axios.get<Books[]>(`${API_URL}/Books`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching books:', error);
        throw error;
      }
}

export const addBooks= async(book:NewBook):Promise<NewBook>=>{
    try{
        const response =await axios.post<NewBook>(`${API_URL}/Books`,book,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error creating books:', error);
        throw error;
      }
}

export const updateBook = async (bookId: number, updatedBook: NewBook): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/Books/${bookId}`, updatedBook,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/Books/${bookId}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}