import axios from "axios";
import {Category, NewCategory} from '../Interface/Category';

const API_URL="https://localhost:7175/api";

export const getCategories= async():Promise<Category[]>=>{
    try{
        const response= await axios.get<Category[]>(`${API_URL}/Category`);
    return response.data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
}

export const addCategory=async(category:NewCategory):Promise<NewCategory>=>{
    try{
        const response=await axios.post<NewCategory>(`${API_URL}/Category`,category);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
}

export const getCategoryByID=async(id:number):Promise<Category>=>{
    try{
        const response=await axios.get<Category>(`${API_URL}/Category/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
}

export const updateCategory = async (id: number, updatedCategory: NewCategory): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/Category/${id}`, updatedCategory);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/Category/${id}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}