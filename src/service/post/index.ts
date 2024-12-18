'use server'
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";
import { log } from "console";

/* eslint-disable prettier/prettier */
export const postData = async (userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/create-post", userData);
      //console.log(data); 
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
    };

  export const fetchPost=async(): Promise<any>=>{
      try {
          const {data}=await axiosInstance.get('/posts')
         //console.log(data);
          return data
      } catch (error:any) {
          throw new Error(error.message)
      }
  }