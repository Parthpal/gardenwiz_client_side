"use server";

import axiosInstance from "../../lib/AxiosInstance";

export const searchItems = async (searchTerm: string) => {
  try {
    const res = await axiosInstance.get(`/search-items?searchTerm=${searchTerm}`);
    return res.data; // Corrected: Access the 'data' property of the response
  } catch (error) {
    throw new Error("Failed to search items");
  }
};
