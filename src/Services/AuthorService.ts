import axios from "axios";
import {Author,newAuthor} from '../Interface/Author';

const API_URL="https://localhost:7175/api";

export const getAuthors= async():Promise<Author[]>=>{
    try{
        const response= await axios.get<Author[]>(`${API_URL}/Author`);
    return response.data;
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
      }
    
}

export const addAuthors=async(author:newAuthor):Promise<newAuthor>=>{
    try{
        const response=await axios.post<newAuthor>(`${API_URL}/Author`,author);
        return response.data;
    }
    catch (error) {
        console.error('Error adding authors:', error);
        throw error;
    }
}

export const getAuthorByID=async(id:number):Promise<Author>=>{
    try{
        const response=await axios.get<Author>(`${API_URL}/Author/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
    }
}

export const updateAuthor=async(id:number,author:newAuthor):Promise<void>=>{
    try{
        const response= await axios.put(`${API_URL}/Author/${id}`,author);
        return response.data;
    }
    catch (error) {
        console.error('Error updating author:', error);
        throw error;
    }
}

export const deleteAuthor=async(id:number):Promise<void>=>{
    try{
        var response=await axios.delete(`${API_URL}/Author/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error deleteing author:', error);
        throw error;
    }
}