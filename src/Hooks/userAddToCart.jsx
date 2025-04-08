import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useCart } from "./useCart";
import Swal from "sweetalert2";

export const useAddToCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { cart, refetch, isLoading, isError } = useCart();

  const restaurant = cart.map((item) => item.foodOwner);

  const addToCart = async (food) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const foodWithEmail = {
      ...food,
      userEmail: user.email,
    };

    console.log("res", restaurant[0], "addedFood", food.addedBy);

    if (restaurant[0] === food.addedBy) {
      try {
        const res = await axiosPublic.post(`/api/cart`, {
          food: foodWithEmail,
        });
        if (res.status == 200) {
          refetch();
          toast.success("Added to cart");
        }
        console.log(res);
      } catch (error) {
        console.log("Error at useAddToCart function", error);
      }
    } else {
      Swal.fire({
        title: "This food is from another restaurant.",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete cart",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axiosPublic.delete(`/api/clear-cart/${user.email}`);
          Swal.fire("Deleted!", "", "Added to cart");
          try {
            axiosPublic
              .post(`/api/cart`, { food: foodWithEmail })
              .then((res) => {
                if (res.status == 200) {
                  refetch();
                  toast.success("Added to cart");
                }
              });
          } catch (error) {
            console.log("Error at useAddToCart function", error);
          }
        }
      });
    }
  };

  return addToCart;
};
