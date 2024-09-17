import axios, { AxiosError } from "axios";
import { User } from "../Interface/Users";
import { ValidationResponse } from "../Interface/ValidationResponse";
import { handleAxiosError } from "./ErrorResponse";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;
const token= localStorage.getItem("JWTToken");

export const Register=async(role:string,user:User):Promise<ValidationResponse>=>{
    try{
        var response= await axios.post(`${API_URL}/User/Register/${role}`,user,{
            headers:{
                [API_KEY!]: API_KEY_VALUE!,
            }
        });
        return {
            success:true,
            message:"Sign in Successful",
            data:response.data,
        }
    }
    catch (error) {
        console.error('Error registering user:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const Validate=async(user:User):Promise<ValidationResponse>=>{
    try{
        var response= await axios.post(`${API_URL}/User/validate`,user,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          });
        var token=response.data.token;
        localStorage.setItem("JWTToken",token);
        return {
            success:true,
            message:"Login Successful",
            data:response.data.data,
        };
    }
    catch (error) {
        console.error('Error Validating user:', error);
        return handleAxiosError(error as AxiosError);
    }
}
export const UpdateUserName=async(id:number,userName:string):Promise<ValidationResponse>=>{
    try{
        await axios.put(`${API_URL}/User/UpdateUserName`,{id,userName},{
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
        console.error('Error updating username:', error);
        return handleAxiosError(error as AxiosError);
    }
}

export const UpdateUserEmail=async(id:number,emailID:string):Promise<ValidationResponse>=>{
    try{
        await axios.put(`${API_URL}/User/UpdateUserEmail`,{id,emailID},{
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
        console.error('Error updating userEmail:', error);
        return handleAxiosError(error as AxiosError);
    }
}
export const UpdateUserPassword=async(id:number,currentPassword:string,newPassword:string):Promise<ValidationResponse>=>{
    try{
        await axios.put(`${API_URL}/User/UpdateUserPassword`,{id,currentPassword,newPassword},{
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
        console.error('Error updating userpassword:', error);
        return handleAxiosError(error as AxiosError);
    }
}
export const GetUsersList=async():Promise<ValidationResponse>=>{
    try{
        var response=await axios.get(`${API_URL}/User/GetUsers`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {success:true,
            message:"Successfull",
            data:response.data
        }
    }
    catch (error) {
        console.error('Error updating userpassword:', error);
        return handleAxiosError(error as AxiosError);
    }
}
export const RemoveUser=async(id:number):Promise<ValidationResponse>=>{
    try{
        await axios.delete(`${API_URL}/User/RemoveUser/${id}`,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {success:true,
            message:"Successfull",
        }
    }
    catch (error) {
        console.error('Error updating userpassword:', error);
        return handleAxiosError(error as AxiosError);
    }
}
export const AdminUpdateUser=async(id:number,user:User):Promise<ValidationResponse>=>{
    try{
        await axios.put(`${API_URL}/User/AdminUpdateUser/${id}`,user,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
                'Authorization':`Bearer ${token}`
            }
          });
          return {success:true,
            message:"Successfully Updated user"
        }
    }
    catch (error) {
        console.error('Error updating userEmail:', error);
        return handleAxiosError(error as AxiosError);
    }
}