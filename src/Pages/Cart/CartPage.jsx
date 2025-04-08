import React from 'react';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import PrimaryButton from '../../Shared/PrimaryButton';
import { useCart } from '../../Hooks/useCart';
import { Link } from 'react-router';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, refetch, isLoading, isError } = useCart();
  const axiosPublic = useAxiosPublic();

  const subtotal = cart?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleDeleteCartFood = async id => {
    const res = await axiosPublic.delete(`/api/cart/${id}`);
    if (res.status === 200) {
      refetch();
      toast.success('Deleted');
    }
  };

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
              <Link to={'/all-food'}>
                <PrimaryButton text={'Add Food'} />
              </Link>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
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
                    <td>{item.quantity}</td>
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
                <td>Total</td>
                <td>{subtotal + 30}$</td>
              </tr>
            </tbody>
          </table>
          <PrimaryButton text={'Proceed to Payment'} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
