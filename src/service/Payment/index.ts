/* eslint-disable prettier/prettier */
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

