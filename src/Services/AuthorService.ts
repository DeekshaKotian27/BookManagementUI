import axios, { AxiosError } from "axios";
import {Author,newAuthor} from '../Interface/Author';
import { ValidationResponse } from "../Interface/ValidationResponse";
import { handleAxiosError } from "./ErrorResponse";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;
const token= localStorage.getItem("JWTToken");

export const getAuthors= async():Promise<ValidationResponse>=>{
    try{
        const response= await axios.get<Author[]>(`${API_URL}/Author`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
    return {
        success:true,
        message:"Successfull",
        data:response.data,
    }
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        return handleAxiosError(error as AxiosError);
      }
    
}

export const addAuthors=async(author:newAuthor):Promise<ValidationResponse>=>{
    try{
        await axios.post<newAuthor>(`${API_URL}/Author`,author,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
        return {
            success:true,
            message:"Author added successfully"
        };
    }
    catch (error) {
        console.error('Error adding authors:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const getAuthorByID=async(id:number):Promise<ValidationResponse>=>{
    try{
        const response=await axios.get<Author>(`${API_URL}/Author/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
        return {success:true,
            message:"Successful",
            data:response.data
        }
    }
    catch (error) {
        console.error('Error fetching authors:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const updateAuthor=async(id:number,author:newAuthor):Promise<ValidationResponse>=>{
    try{
        await axios.put(`${API_URL}/Author/${id}`,author,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
        return {success:true,
            message:"Successfully Updated"
        }
    }
    catch (error) {
        console.error('Error updating author:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const deleteAuthor=async(id:number):Promise<ValidationResponse>=>{
    try{
        await axios.delete(`${API_URL}/Author/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
        return {
            success:true,
            message:"Deleted successfully"
        }
    }
    catch (error) {
        console.error('Error deleteing author:', error);
        return handleAxiosError(error as AxiosError);
    }
}