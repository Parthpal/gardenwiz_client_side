/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { downvotePost, fetchPost, upvotePost } from "../service/post"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const UseGetPosts=()=>{
    return useQuery({
        queryKey: ["GET_POSTS"],
        queryFn: async () => await fetchPost(),
    })
}

export const useUpvote = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{id:string}>({
        mutationKey: ["post_upvote"],
        mutationFn: async (id:any) => await upvotePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_POSTS"]);
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}
export const useDOwnvote = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,FieldValues>({
        mutationKey: ["post_downvote"],
        mutationFn: async (id) => await downvotePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["GET_POSTS"]);
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}