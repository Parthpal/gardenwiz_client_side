/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addComments, deleteComments, deletePosts, downvotePost, editComment, fetchComments, fetchPost, fetchPostFromID, postData, upvotePost } from "../service/post"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const UseGetPosts=()=>{
    return useQuery({
        queryKey: ["GET_POSTS"],
        queryFn: async () => await fetchPost(),
        staleTime: 0,
        refetchOnMount: true,
    })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
      mutationKey: ["create_post"],
      mutationFn: async (userData) => await postData(userData),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] }); // Invalidate post list
          toast.success("Post created successfully!");
      },
      onError: (error) => {
          toast.error(error.message || "Failed to create post");
      },
  });
};

export const UseGetPostsId=(id: string)=>{
    return useQuery({
        queryKey: ["GET_POSTS_Id", id],
        queryFn: async () => await fetchPostFromID(id),
    })
}

export const useUpvote = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{id:string}>({
        mutationKey: ["post_upvote"],
        mutationFn: async (id:any) => await upvotePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}
export const useDOwnvote = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{id:string}>({
        mutationKey: ["post_downvote"],
        mutationFn: async (id:any) => await downvotePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}

export const UseGetPostsComments=()=>{
  return useQuery({
      queryKey: ["GET_Comments"],
      queryFn: async () => await fetchComments(),
  })
}

export const useAddComments = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{id:string,commentData:any}>({
        mutationKey: ["add_comments"],
        mutationFn: async ({id,commentData}) => await addComments(id, commentData),
        onSuccess: (_, { id }) => {
           queryClient.invalidateQueries({ queryKey: ["GET_POSTS_Id"] });
            toast.message('Comments Added');  
          },
          onError: (error) => {
            toast.error(error.message);
          },   
    })
}
  export const useDeleteComments = () => {
  const queryClient = useQueryClient();
  return useMutation<any,Error,{id:string,postId:string}>({
      mutationKey: ["delete_comments"],
      mutationFn: async ({id,postId}) => await deleteComments(id, postId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["GET_POSTS_Id"] });
         toast.message('Comments Deleted');  
        },
        onError: (error) => {
         toast.error(error.message);
        },   
  })
}
export const useDeletePosts = () => {
  const queryClient = useQueryClient();
  return useMutation<any,Error,{id:string}>({
      mutationKey: ["delete_comments"],
      mutationFn: async ({id}) => await deletePosts(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["GET_POSTS_Id"] });
         toast.message('Post Deleted');  
        },
        onError: (error) => {
         toast.error(error.message);
        },   
  })
}

export const useEditComments = () => {
  const queryClient = useQueryClient();
  return useMutation<any,Error,{commentID:any,commentsData:any}>({
      mutationKey: ["delete_comments"],
      mutationFn: async ({commentID,commentsData}) => await editComment(commentID, commentsData),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["GET_POSTS_Id"] });
         toast.message('Comments Edited');  
        },
        onError: (error) => {
         toast.error(error.message);
        },   
  })
}