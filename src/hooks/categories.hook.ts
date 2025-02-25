/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query"

import { fetchCategory } from "../service/categories"

export const UsefetchCategories=()=>{
    return useQuery({
        queryKey: ["GET_CATEGORIES"],
        queryFn: async () => await fetchCategory(),
    })
}