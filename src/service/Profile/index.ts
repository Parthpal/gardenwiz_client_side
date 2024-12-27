/* eslint-disable prettier/prettier */
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";

export const updateUser = async (userData: FieldValues,id:string) => {
    try {
      const { data } = await axiosInstance.put(`/user/${id}`, userData);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

export const fetchUser=async()=>{
  try {
      const {data}=await axiosInstance.get('/user')
      return data
  } catch (error:any) {
      throw new Error(error.message)
  }
}