/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use server"
import axiosInstance from "../../lib/AxiosInstance"

export const fetchCategory=async()=>{
    try {
        const {data}=await axiosInstance.get('/category')
        return data
    } catch (error:any) {
        throw new Error(error.message)
    }
}