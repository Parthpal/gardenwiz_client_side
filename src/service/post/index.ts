import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";

/* eslint-disable prettier/prettier */
export const postData = async (userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/create-post", userData);
      console.log(data); 
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
    };