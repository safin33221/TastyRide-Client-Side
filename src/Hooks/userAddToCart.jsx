import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useCart } from "./useCart";

export const useAddToCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { cart, refetch, isLoading, isError } = useCart();

  const addToCart = async (food) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const foodWithEmail = {
      ...food,
      userEmail: user.email,
    };

    try {
      const res = await axiosPublic.post(`/api/cart`, { food: foodWithEmail });
      if (res.status == 200) {
        refetch()
        toast.success("Added to cart");
      }
      console.log(res);
    } catch (error) {
      console.log("Error at useAddToCart function", error);
    }
  };

  return addToCart;
};
