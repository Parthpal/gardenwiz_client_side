/* eslint-disable prettier/prettier */
"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../../lib/AxiosInstance";

export const updateUser = async (userData: FieldValues,id:any) => {
    try {
      const { data } = await axiosInstance.put(`/user/${id}`, userData);

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
export const modifyUser= async (userData: FieldValues,id:any) => {
    try {
      const { data } = await axiosInstance.put(`/user/update/${id}`, userData);

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

export const updateUserStatus = async (id:string) => {
    try {
      const { data } = await axiosInstance.patch(`/user/status/${id}`);

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

export const fetchUserFromID=async(id:string): Promise<any>=>{
  
  try{
          const {data}=await axiosInstance.get(`/user/${id}`);

        // console.log(data);
          return data;
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
export const deleteFollowing = async (followingID:string,currentUserId:string|undefined) => {
  try {
    const { data } = await axiosInstance.put(`/user/${followingID}/unfollow`,{currentUser:currentUserId});

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addFavouritePosts=async(userId:any,postData:any): Promise<any>=>{
  try {   
      const {data}=await axiosInstance.put(`/user/${userId}/favouritePost`,postData)

      return data;
  } catch (error:any) {
      throw new Error(error.message)
  }
}