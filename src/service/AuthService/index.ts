/* eslint-disable prettier/prettier */
"use server";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";
import { toast } from "sonner";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);
    console.log(data); 
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
      
  };
  export const loginUser = async (userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", userData);
  
      if (data.success) {
        cookies().set("accessToken", data?.data?.accessToken);
        cookies().set("refreshToken", data?.data?.refreshToken);
      }
  
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  export const logout = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  };

  export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;    
    let decodedToken = null;
  
    if (accessToken) {
      decodedToken = await jwtDecode(accessToken);
  
      return {
        _id: decodedToken._id,
        name: decodedToken.name,
        email: decodedToken.email,
        mobileNumber: decodedToken.mobileNumber,
        role: decodedToken.role,
        status: decodedToken.status,
        profilePhoto: decodedToken.profilePhoto,
        followerIds:decodedToken.followerIds,
        followingIds:decodedToken.followingIds
      };
    }
  
    return decodedToken;
  };