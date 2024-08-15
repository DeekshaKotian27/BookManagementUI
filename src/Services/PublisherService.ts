import axios from "axios";
import {NewPublisher, Publisher} from '../Interface/Publisher';

const API_URL="https://localhost:7175/api";

export const getPublishers= async():Promise<Publisher[]>=>{
    try{
        const response= await axios.get<Publisher[]>(`${API_URL}/Publisher`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching publisher:', error);
        throw error;
      }
}

export const addPublisher=async(publisher:NewPublisher):Promise<NewPublisher>=>{
    try{
        const response=await axios.post<NewPublisher>(`${API_URL}/Publisher`,publisher);
        return response.data;
    }
    catch (error) {
        console.error('Error adding publisher:', error);
        throw error;
      }
}

export const getPublisherByID=async(id:number):Promise<Publisher>=>{
    try{
        const response=await axios.get<Publisher>(`${API_URL}/Publisher/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching publisher:', error);
        throw error;
      }
}

export const updatePublisher = async (id: number, updatedPublisher: NewPublisher): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/Publisher/${id}`, updatedPublisher);
        return response.data;
    } catch (error) {
        console.error('Error updating publisher:', error);
        throw error;
    }
}

export const deletePublisher = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/Publisher/${id}`);
    } catch (error) {
        console.error('Error deleting Publisher:', error);
        throw error;
    }
}