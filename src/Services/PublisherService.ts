import axios, { AxiosError } from "axios";
import {NewPublisher, Publisher} from '../Interface/Publisher';
import { ValidationResponse } from "../Interface/ValidationResponse";
import { handleAxiosError } from "./ErrorResponse";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;
const token= localStorage.getItem("JWTToken");

export const getPublishers= async():Promise<ValidationResponse>=>{
    try{
        const response= await axios.get<Publisher[]>(`${API_URL}/Publisher`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {
            success: true,
            message: "Successfull",
            data: response.data,
          };
    }
    catch (error) {
        console.error('Error fetching publisher:', error);
        return handleAxiosError(error as AxiosError);
      }
}

export const addPublisher=async(publisher:NewPublisher):Promise<ValidationResponse>=>{
    try{
        await axios.post<NewPublisher>(`${API_URL}/Publisher`,publisher,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {
            success: true,
            message: "Publisher added successfully",
          };
    }
    catch (error) {
        console.error('Error adding publisher:', error);
        return handleAxiosError(error as AxiosError);
      }
}

export const getPublisherByID=async(id:number):Promise<ValidationResponse>=>{
    try{
        const response=await axios.get<Publisher>(`${API_URL}/Publisher/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {
            success:true,
            message:"Successful",
            data:response.data
        }
    }
    catch (error) {
        console.error('Error fetching publisher:', error);
        return handleAxiosError(error as AxiosError);
      }
}

export const updatePublisher = async (id: number, updatedPublisher: NewPublisher): Promise<ValidationResponse> => {
    try {
        await axios.put(`${API_URL}/Publisher/${id}`, updatedPublisher,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {success:true,
            message:"Successfully Updated"
        }
    } catch (error) {
        console.error('Error updating publisher:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const deletePublisher = async (id: number): Promise<ValidationResponse> => {
    try {
        await axios.delete(`${API_URL}/Publisher/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {
            success:true,
            message:"Deleted successfully"
        }
    } catch (error) {
        console.error('Error deleting Publisher:', error);
        return handleAxiosError(error as AxiosError);
    }
}