/* eslint-disable padding-line-between-statements */
'use server'
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";
import { log } from "console";
import { revalidateTag } from "next/cache";
import envConfig from "../../config/envConfig";

/* eslint-disable prettier/prettier */
export const postData = async (userData: FieldValues) => {

    try {
      const { data } = await axiosInstance.post("/create-post", userData,);
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
          return data;
      } catch (error:any) {
          throw new Error(error.message)
      }
  }
  export const fetchPostFromID=async(id:string): Promise<any>=>{
    // const config = {
    //     headers: {
    //       "Cache-Control": "no-store", // To disable caching (if required)
    //     },
    //     next: {
    //       tags: ["postsID"], // Relevant only for Next.js
    //     },
    //   };
    //   try {
    //     const res = await fetch(
    //         `${envConfig.baseApi}/posts/${id}`,
    //         config,
    //       );
        
    //       return res.json();
 try{
        const {data}=await axiosInstance.get(`/posts/${id}`);
       // console.log(data);
        return data.data;
      } catch (error:any) {
          throw new Error(error.message)
      }
  }
  export const upvotePost=async(id:string): Promise<any>=>{
      try {
          const {data}=await axiosInstance.patch(`/posts/upvote/${id}`)
          return data;
      } catch (error:any) {
          throw new Error(error.message)
      }
  }
  export const downvotePost=async(id:string): Promise<any>=>{
      try {
          const {data}=await axiosInstance.patch(`/posts/downvote/${id}`)
          return data;
      } catch (error:any) {
          throw new Error(error.message)
      }
  }
  export const fetchComments=async(): Promise<any>=>{
    try {
        const {data}=await axiosInstance.get('/ALLComments')
       //console.log(data);
        return data;
    } catch (error:any) {
        throw new Error(error.message)
    }
}
  export const addComments=async(id:string,commentsData:any): Promise<any>=>{
      try {
          console.log('comments'+id,commentsData);    
          const {data}=await axiosInstance.put(`/posts/comments/${id}`,commentsData)
          revalidateTag('postsID');
          return data;
      } catch (error:any) {
          throw new Error(error.message)
      }
  }
  export const editComment=async(id:string,commentsData:any): Promise<any>=>{
      try {
          const {data}=await axiosInstance.patch(`/posts/comments/${id}`,commentsData)
          return data;
      } catch (error:any) {
          throw new Error(error.message)
      }
  }
  export const deleteComments=async(id:string,postId:string): Promise<any>=>{
    try {
        const {data}=await axiosInstance.delete(`/posts/comments/${id}`,{data:{postData:postId}})
        return data;
    } catch (error:any) {
        throw new Error(error.message)
    }
}
  export const deletePosts=async(id:string): Promise<any>=>{
    try {
        const {data}=await axiosInstance.delete(`/posts/${id}`)
        return data;
    } catch (error:any) {
        throw new Error(error.message)
    }
}
