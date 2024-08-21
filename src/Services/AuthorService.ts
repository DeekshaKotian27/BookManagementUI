import axios from "axios";
import {Author,newAuthor} from '../Interface/Author';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;

export const getAuthors= async():Promise<Author[]>=>{
    try{
        const response= await axios.get<Author[]>(`${API_URL}/Author`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
    return response.data;
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
      }
    
}

export const addAuthors=async(author:newAuthor):Promise<newAuthor>=>{
    try{
        const response=await axios.post<newAuthor>(`${API_URL}/Author`,author,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error adding authors:', error);
        throw error;
    }
}

export const getAuthorByID=async(id:number):Promise<Author>=>{
    try{
        const response=await axios.get<Author>(`${API_URL}/Author/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
    }
}

export const updateAuthor=async(id:number,author:newAuthor):Promise<void>=>{
    try{
        const response= await axios.put(`${API_URL}/Author/${id}`,author,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error updating author:', error);
        throw error;
    }
}

export const deleteAuthor=async(id:number):Promise<void>=>{
    try{
        var response=await axios.delete(`${API_URL}/Author/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error deleteing author:', error);
        throw error;
    }
}