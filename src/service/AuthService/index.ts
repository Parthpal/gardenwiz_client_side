/* eslint-disable prettier/prettier */
"use server";
import { FieldValues } from "react-hook-form";
import { cookies, headers } from "next/headers";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "../../lib/AxiosInstance";

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

  export const changePassword = async (userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/auth/change-password/", userData);

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
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
        role: decodedToken.role,
        status: decodedToken.status,
        profilePhoto: decodedToken.profilePhoto,
        followerIds:decodedToken.followerIds,
        followingIds:decodedToken.followingIds
      };
    }
  
    return decodedToken;
  };

  export const getNewAccessToken = async () => {
    try {
      const refreshToken = cookies().get("refreshToken")?.value;
  
      const res = await axiosInstance({
        url: "/auth/refresh-token",
        method: "POST",
        withCredentials: true,
        headers: {
          cookie: `refreshToken=${refreshToken}`,
        },
      });
  
      return res.data;
    } catch (error) {
      throw new Error("Failed to get new access token");
    }
  };

export const forgetPassword = async (userData: FieldValues) => {

    try {
      const { data } = await axiosInstance.post("/auth/forget-password", userData);

      //console.log(data); 
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
    };
export const resetPassword = async (userData: any,token:any) => {
  
    try {
      const { data } = await axiosInstance.post("/auth/reset-password",
         userData,
        {
          headers:{
            Authorization:`${token}`,
            "Content-Type": "application/json",
          }
        });

      //console.log(data); 
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
    };