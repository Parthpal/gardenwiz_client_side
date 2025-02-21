/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addFavouritePosts, addFollower, deleteFollower, deleteFollowing, fetchUser, fetchUserFromID, modifyUser, updateUser } from "../service/Profile"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const UsefetchUsers=()=>{
    return useQuery({
        queryKey: ["AllUsers"],
        queryFn: async () => await fetchUser(),
    })
}

export const UseGetUsersById=(id: any)=>{
  return useQuery({
      queryKey: ["Fetch_By_Users_Id", id],
      queryFn: async () => await fetchUserFromID(id),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { userData: any; id: any }>({
      mutationKey: ["update_user"],
      mutationFn: async ({ userData, id }) => await updateUser(userData, id),
      onSuccess: () => {
          // queryClient.invalidateQueries('GET_POSTS'); // Refresh user data
          // queryClient.invalidateQueries('GET_Users'); // Refresh post data
          // queryClient.invalidateQueries({ queryKey: ['AllUsers'] });
          queryClient.invalidateQueries({ queryKey: ['Fetch_By_Users_Id'] });
          queryClient.invalidateQueries({ queryKey: ['GET_POSTS'] });
          toast.success("User updated successfully!");
      },
      onError: (error) => {
          toast.error(error.message || "Failed to update user");
      },
  });
};
export const useModifyUser = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { userData: any; id: any }>({
      mutationKey: ["modification_user"],
      mutationFn: async ({ userData, id }) => await modifyUser(userData, id),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['AllUsers'] });
          queryClient.invalidateQueries({ queryKey: ['GET_POSTS'] });
          toast.success("User updated successfully!");
      },
      onError: (error) => {
          toast.error(error.message || "Failed to update user");
      },
  });
};

export const useAddFollower = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{ followerID: string, currentUserId: string }>({
        mutationKey: ["add_follower"],
        mutationFn: async ({ followerID, currentUserId}) => await addFollower(followerID, currentUserId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_POSTS'] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}
export const useDeleteFollowing = () => {
    const queryClient = useQueryClient();
    return useMutation<any,Error,{ followingID: string; currentUserId: string | 'undefined' }>({
        mutationKey: ["delete_following"],
        mutationFn: async ({followingID,currentUserId}) => await deleteFollowing(followingID,currentUserId),
        onSuccess: () => {
            toast.success('You have unfollowed successfully. Stay connected anytime!')
            queryClient.invalidateQueries({ queryKey: ['Fetch_By_Users_Id'] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
                
    })
}
export const useAddFavouritePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { userId: any; postData: any }>({
      mutationKey: ["add_favourite_post"],
      mutationFn: async ({ userId, postData }) => await addFavouritePosts(userId, postData),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] }); // Refresh favorite posts
          toast.success("Post added to favorites!");
      },
      onError: (error) => {
          toast.error(error.message || "Failed to add favorite post");
      },
  });
};