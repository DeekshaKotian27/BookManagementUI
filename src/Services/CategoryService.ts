import axios, { AxiosError } from "axios";
import {Category, NewCategory} from '../Interface/Category';
import { ValidationResponse } from "../Interface/ValidationResponse";
import { handleAxiosError } from "./ErrorResponse";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;
const token= localStorage.getItem("JWTToken");

export const getCategories= async():Promise<ValidationResponse>=>{
    try{
        const response= await axios.get<Category[]>(`${API_URL}/Category/GetAllCategory`,{
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
        console.error('Error fetching category:', error);
        return handleAxiosError(error as AxiosError);
      }
}

export const addCategory=async(category:NewCategory):Promise<ValidationResponse>=>{
    try{
        await axios.post<NewCategory>(`${API_URL}/Category/CreateCategory`,category,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {
            success: true,
            message: "Category added successfully",
          };
    }
    catch (error) {
        console.error('Error fetching category:', error);
        return handleAxiosError(error as AxiosError);
      }
}

export const getCategoryByID=async(id:number):Promise<ValidationResponse>=>{
    try{
        const response=await axios.get<Category>(`${API_URL}/Category/GetCategoryByID/${id}`,{
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
        console.error('Error fetching category:', error);
        return handleAxiosError(error as AxiosError);
      }
}

export const updateCategory = async (id: number, updatedCategory: NewCategory): Promise<ValidationResponse> => {
    try {
        await axios.put(`${API_URL}/Category/UpdateCategory/${id}`, updatedCategory,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {success:true,
            message:"Successfully Updated"
        }
    } catch (error) {
        console.error('Error updating category:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const deleteCategory = async (id: number): Promise<ValidationResponse> => {
    try {
        await axios.delete(`${API_URL}/Category/DeleteCategory/${id}`,{
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
        console.error('Error deleting category:', error);
        return handleAxiosError(error as AxiosError);
    }
}