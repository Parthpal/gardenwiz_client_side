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

export const addFollower = async (followerID:any,currentUserId:any) => {
  try {
    const { data } = await axiosInstance.put(`/user/${followerID}/follow`,{currentUser:currentUserId});
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const deleteFollower = async (followerID:string,currentUserId:string) => {
  try {
    const { data } = await axiosInstance.put(`/user/${followerID}/unfollow`,{currentUser:currentUserId});
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};