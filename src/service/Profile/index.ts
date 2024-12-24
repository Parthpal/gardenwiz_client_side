/* eslint-disable prettier/prettier */
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";

export const updateUser = async (userData: FieldValues,id:string) => {
    try {
      const { data } = await axiosInstance.put("/auth/register", userData);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
    };