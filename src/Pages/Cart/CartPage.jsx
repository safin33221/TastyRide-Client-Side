import React from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import PrimaryButton from "../../Shared/PrimaryButton";

const CartPage = () => {
    console.log(window.location.pathname.includes("/cart"))
  return (
    <div className=" container mx-auto pt-20">
      <h1 className="font-bold text-5xl text-center mb-10">Cart</h1>
      <div className="grid grid-cols-6 items-start gap-5">
        {/* cart  */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 col-span-4">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  100$
                </td>
                <td>1</td>
                <th>
                  <button className="btn btn-ghost btn-md">
                    <RiDeleteBin4Fill className="text-xl text-red-500"/>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* total amount */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 col-span-2">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>Subtotal</td>
                <td>100</td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>Delivery Charge</td>
                <td>30</td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>Total</td>
                <td>130</td>
              </tr>
            </tbody>
          </table>
          <PrimaryButton text={"Proceed to Payment"}/>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
