"use server";

import axiosInstance from "../../lib/AxiosInstance";

export const searchItems = async (searchTerm: string) => {
  //console.log(searchTerm);
  try {
    const res = await axiosInstance.get(
      `/searchPosts?searchTerm=${searchTerm}`
    );
    return res.data; // Corrected: Access the 'data' property of the response
  } catch (error) {
    throw new Error("Failed to search items");
  }
};

// export const deleteFollowing = async (followingID:string,currentUserId:string|undefined) => {
//   try {
//     const { data } = await axiosInstance.put(`/user/${followingID}/unfollow`,{currentUser:currentUserId});
//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };