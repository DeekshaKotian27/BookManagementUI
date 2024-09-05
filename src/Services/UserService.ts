import axios, { AxiosError } from "axios";
import { User } from "../Interface/Users";
import { ValidationResponse } from "../Interface/ValidationResponse";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY_VALUE=process.env.REACT_APP_API_KEY_VALUE;

export const Register=async(user:User):Promise<ValidationResponse>=>{
    try{
        var response= await axios.post(`${API_URL}/User`,user,{
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
        console.error('Error registering the user:', error);
        return {
            success:false,
            message:"Failed to Sign Up, Please Try again later",
        }
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
        console.log(response.data)        
        return {
            success:true,
            message:"Login Successful",
            data:response.data.data,
        };
    }
    catch (error) {
        var axioserror=error as AxiosError;
        console.error('Error Validating the user:', error);
        if(axioserror.response && axioserror.response.status===403){
            return {
                success:false,
                message:"Invalid Password"
            }
        }
        else if(axioserror.response && axioserror.response.status===401){
            return {
                success:false,
                message:"The MailID is not registered to the webiste.To register please Sign Up."
            }
        }
        else{
            return {
                success:false,
                message:"There may be some network issue,Please try again later"
            }
        }
    }
}