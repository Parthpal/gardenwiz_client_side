/* eslint-disable prettier/prettier */
"use server";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiosInstance";

export const postPaymentIntent = async (paymentPriceData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/create-payment-intent",paymentPriceData);
      console.log(data); 
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
};

export const postPaymentData = async (paymentData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/payments", paymentData);
      //console.log(data); 
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
};

export const fetchPayment=async(): Promise<any>=>{
  try {
      const {data}=await axiosInstance.get('/payments')
     //console.log(data);
      return data;
  } catch (error:any) {
      throw new Error(error.message)
  }
}