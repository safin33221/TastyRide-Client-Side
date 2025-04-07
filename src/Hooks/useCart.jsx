import useAuth from "./useAuth"
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "./useAxiosPublic";

export const useCart = () => {
    const {user} = useAuth()
    
    const axiosPublic = useAxiosPublic()
    const {data:cart=[], refetch} = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await axiosPublic.get("/api/cart", {email:user.email})
            console.log(res.data)
            return res.data
        }
    })

    return {cart, refetch}
}