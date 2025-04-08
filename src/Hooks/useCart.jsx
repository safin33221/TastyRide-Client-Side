import useAuth from "./useAuth"
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "./useAxiosPublic";

export const useCart = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosPublic = useAxiosPublic();

  const {
    data: cart = [],
    refetch,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["cart", userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/cart/${userEmail}`);
      console.log(res.data.data)
      return res.data.data;
    },
    enabled: !!userEmail // ✅ Only runs when userEmail is available
  });

  return { cart, refetch, isLoading, isError };
};
