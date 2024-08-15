import axios from "axios";
import { User } from "../Interface/Users";

const API_URL="https://localhost:7175/api";

export const Register=async(user:User):Promise<User>=>{
    try{
        var response= await axios.post(`${API_URL}/User`,user);
        return response.data;
    }
    catch (error) {
        console.error('Error registering the user:', error);
        throw error;
    }
}

export const Validate=async(user:User):Promise<User>=>{
    try{
        var response= await axios.post(`${API_URL}/User/{validate}`,user);
        return response.data;
    }
    catch (error) {
        console.error('Error Validating the user:', error);
        throw error;
    }
}