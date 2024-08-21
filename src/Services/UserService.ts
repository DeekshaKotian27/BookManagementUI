import axios from "axios";
import { User } from "../Interface/Users";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;

export const Register=async(user:User):Promise<User>=>{
    try{
        var response= await axios.post(`${API_URL}/User`,user,{
            headers:{
                [API_KEY!]: API_KEY_VALUE!,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error registering the user:', error);
        throw error;
    }
}

export const Validate=async(user:User):Promise<User>=>{
    try{
        var response= await axios.post(`${API_URL}/User/validate`,user,{
            headers: {
                [API_KEY!]: API_KEY_VALUE!,
            }
          })
        return response.data;
    }
    catch (error) {
        console.error('Error Validating the user:', error);
        throw error;
    }
}