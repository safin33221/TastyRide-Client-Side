import React from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import PrimaryButton from "../../Shared/PrimaryButton";
import { useCart } from "../../Hooks/useCart";
import { Link, useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useUserData from "../../Hooks/useUserData";

const CartPage = () => {
  const { cart, refetch, isLoading, isError } = useCart();
  const axiosPublic = useAxiosPublic();
  const [userData] = useUserData()
  const navigate = useNavigate()

  let subtotal = cart?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  let discount = 0
  if (subtotal > 500) {
    discount = subtotal * 0.05; // 5% discount
  } else if (subtotal >= 1000) {
    discount = subtotal * 0.10; // 10% discount
  } else if (subtotal >= 1000) {
    discount = subtotal * 0.25; // 10% discount
  }
  

  const handleDeleteCartFood = async (id) => {
    const res = await axiosPublic.delete(`/api/cart/${id}`);
    if (res.status === 200) {
      refetch();
      toast.success("Deleted");
    }
  };

  const handleQuantity = async (status, foodId) => {
    try {
      await axiosPublic.patch(`/api/quantity/${userData?.email}`, { status, foodId })
      refetch()
    } catch (error) {
      return toast.error(error)
    }
  }

  const handlePayment = () => {
    if (cart?.length) {
      return navigate("/checkout")
    } else {
      toast.error("Please add some foods")
    }
  }

  const restaurantLink = cart.map((item, index) => item.foodOwner)
  // console.log("res link", restaurantLink[0])

  // ✅ Early return if loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ✅ Early return if error
  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load cart items. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-20">
      <h1 className="font-bold text-5xl text-center mb-10">Cart</h1>
      <div className="grid grid-cols-6 items-start gap-5">
        {/* cart */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 col-span-4">
          {cart.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-red-500 my-5 font-semibold">
                No food added to cart
              </p>
              <Link to={"/all-food"}>
                <PrimaryButton text={"Add Food"} />
              </Link>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr className="">
                  <th>Index</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th className="pl-6">Quantity</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.price}$</td>
                    <td className="">
                      <button
                        onClick={() => handleQuantity('decrease', item?.foodId)}
                        className="btn mx-2">
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => handleQuantity('increase', item?.foodId)}
                        className="btn mx-2">
                        +
                      </button>

                    </td>
                    <td>{item.totalPrice}</td>
                    <th>
                      <button
                        onClick={() => handleDeleteCartFood(item._id)}
                        className="btn btn-ghost btn-md"
                      >
                        <RiDeleteBin4Fill className="text-xl text-red-500" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Link to={`/restaurantProfile/${restaurantLink[0]}`}><PrimaryButton text={"Add more from this restaurant"} /></Link>
        </div>

        {/* total amount */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 col-span-2">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>{subtotal}$</td>
              </tr>
              <tr>
                <td>Delivery Charge</td>
                <td>30</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{discount.toFixed(2) || 0} </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{subtotal + 30 - discount}$</td>
              </tr>
            </tbody>
          </table>
          <button className="w-full" onClick={() => handlePayment()}><PrimaryButton text={"Proceed to Payment"} /></button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
