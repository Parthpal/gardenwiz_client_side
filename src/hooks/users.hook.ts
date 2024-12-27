"use server"
import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../service/Profile"

export const UsefetchUsers=()=>{
    return useQuery({
        queryKey: ["GET_Users"],
        queryFn: async () => await fetchUser(),
    })
}