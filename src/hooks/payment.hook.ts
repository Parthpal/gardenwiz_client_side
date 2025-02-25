import { useQuery } from "@tanstack/react-query"

import { fetchPayment } from "../service/Payment"

export const UsefetchPayment=()=>{
    return useQuery({
        queryKey: ["GET_Payment"],
        queryFn: async () => await fetchPayment(),
    })
}