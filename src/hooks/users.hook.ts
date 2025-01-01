/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use server"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addFollower, deleteFollower, fetchUser } from "../service/Profile"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const UsefetchUsers=()=>{
    return useQuery({
        queryKey: ["GET_Users"],
        queryFn: async () => await fetchUser(),
    })
}

export const UseAddFollower = (followerID: string, currentUserId: string) => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{ followerID: string; currentUserId: string }>({
        mutationKey: ["add_follower"],
        mutationFn: async ({followerID,currentUserId}) => await addFollower(followerID,currentUserId),
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_Users"]);
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}
export const UseDeleteFollower = (followerID: string, currentUserId: string) => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{ followerID: string; currentUserId: string }>({
        mutationKey: ["delete_follower"],
        mutationFn: async ({followerID,currentUserId}) => await deleteFollower(followerID,currentUserId),
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_Users"]);
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}