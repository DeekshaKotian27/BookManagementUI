import axios from "axios";
import {Category, NewCategory} from '../Interface/Category';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;

export const getCategories= async():Promise<Category[]>=>{
    try{
        const response= await axios.get<Category[]>(`${API_URL}/Category`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
    return response.data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
}

export const addCategory=async(category:NewCategory):Promise<NewCategory>=>{
    try{
        const response=await axios.post<NewCategory>(`${API_URL}/Category`,category,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
}

export const getCategoryByID=async(id:number):Promise<Category>=>{
    try{
        const response=await axios.get<Category>(`${API_URL}/Category/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
}

export const updateCategory = async (id: number, updatedCategory: NewCategory): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/Category/${id}`, updatedCategory,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/Category/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}