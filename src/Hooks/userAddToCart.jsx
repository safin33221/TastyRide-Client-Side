import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

export const useAddToCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const addToCart = async (food) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const foodWithEmail = {
      ...food,
      userEmail: user.email
    };

    try {
      const res = await axiosPublic.post("/api/cart", { food: foodWithEmail });
      console.log(res.data);
    } catch (error) {
      console.log("Error at useAddToCart function", error);
    }
  };

  return addToCart;
};
