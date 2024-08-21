import axios from "axios";
import {NewPublisher, Publisher} from '../Interface/Publisher';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;

export const getPublishers= async():Promise<Publisher[]>=>{
    try{
        const response= await axios.get<Publisher[]>(`${API_URL}/Publisher`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching publisher:', error);
        throw error;
      }
}

export const addPublisher=async(publisher:NewPublisher):Promise<NewPublisher>=>{
    try{
        const response=await axios.post<NewPublisher>(`${API_URL}/Publisher`,publisher,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error adding publisher:', error);
        throw error;
      }
}

export const getPublisherByID=async(id:number):Promise<Publisher>=>{
    try{
        const response=await axios.get<Publisher>(`${API_URL}/Publisher/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching publisher:', error);
        throw error;
      }
}

export const updatePublisher = async (id: number, updatedPublisher: NewPublisher): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/Publisher/${id}`, updatedPublisher,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error updating publisher:', error);
        throw error;
    }
}

export const deletePublisher = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/Publisher/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
    } catch (error) {
        console.error('Error deleting Publisher:', error);
        throw error;
    }
}