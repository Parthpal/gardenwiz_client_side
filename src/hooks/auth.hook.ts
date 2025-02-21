/* eslint-disable prettier/prettier */

import { useMutation, useQuery } from "@tanstack/react-query"
import { FieldValues } from "react-hook-form"
import { changePassword, forgetPassword, loginUser, registerUser, resetPassword } from "../service/AuthService"
import { toast } from "sonner"

export const useUserRegistration = () => {
    return useMutation<any,Error,FieldValues>({
        mutationKey: ["USER_REGISTRATION"],
        mutationFn: async (userData) => await registerUser(userData),
        onSuccess: () => {
            toast.success("User registration successful.");
          },
          onError: (error) => {
            toast.error(error.message);
          },      
    })
}

export const useUserChangePassword = () => {
    return useMutation<any,Error,FieldValues>({
        mutationKey: ["USER_Password_Change"],
        mutationFn: async (userData) => await changePassword(userData),
        onSuccess: () => {
            toast.success("Password Changed successfully.");
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}
export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (userData) => await loginUser(userData),
      onSuccess: () => {
        toast.success("User login successful.");
      },
      onError: (error) => {
        toast.error('Login failed!! try again' );
      },
    });
  };

  export const useForgetPassword = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_Forget_Password"],
      mutationFn: async (userData) => await forgetPassword(userData),
      onSuccess: () => {
        toast.success("Check Your Email Inbox");
      },
      onError: (error) => {
      const errorMessage ="Something went wrong"; // Default error message
      toast.error(errorMessage);
      },
    });
  };

  export const useResetPassword = () => {
    return useMutation<any, Error, {userData:any,token:any}>({
      mutationKey: ["USER_Reset_Password"],
      mutationFn: async ({userData,token}) => await resetPassword(userData,token),
      onSuccess: () => {
        toast.success("Password Updated Successfully");
      },
      onError: (error) => {
      const errorMessage ="Something went wrong"; // Default error message
      toast.error(errorMessage);
      },
    });
  };