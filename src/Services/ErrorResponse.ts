import { AxiosError } from "axios";
import { ValidationResponse } from "../Interface/ValidationResponse";

export const handleAxiosError = (error: AxiosError): ValidationResponse => {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return { success: false, message: "Invalid Request, Please try again later" };
            case 401:
                return {success:false,message:"The MailID is not registered to the webiste.To register please Sign Up."}
            case 403:
                return {success:false,message:"Invalid Password"}
            case 404:
                return { success: false, message: "The requested resource was not found." };
            case 409:
                return { success: false, message: "The resource is already registered." };
            case 500:
                return { success: false, message: "An error occurred while processing your request." };
            default:
                return { success: false, message: "An unknown error occurred." };
        }
    }
    return { success: false, message: "Unauthorized user" };
};