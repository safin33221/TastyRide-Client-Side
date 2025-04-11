import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

// Placeholder images (replace with actual URLs or local assets)
const foodImage1 = 'https://via.placeholder.com/80x80.png?text=Food+1';
const foodImage2 = 'https://via.placeholder.com/80x80.png?text=Food+2';
const backgroundFoodImage =
  'https://via.placeholder.com/300x200.png?text=Food+Background';

const OrderTracking = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['userOrders', user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/api/orders/user/${user?.email}`);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to fetch orders');
    },
  });

  // Function to map status to messages and estimated time
  const getStatusDetails = status => {
    switch (status) {
      case 'Pending':
        return {
          message: 'Order placed',
          subMessage: 'We have received your order',
          timeRange: '20:45 – 21:00', // Placeholder, replace with dynamic logic
          showReview: false,
        };
      case 'Cooking':
        return {
          message: 'Preparing your order',
          subMessage: 'The rider is waiting at the restaurant',
          timeRange: '20:45 – 21:00',
          showReview: false,
        };
      case 'On the Way':
        return {
          message: 'On the way',
          subMessage: 'Your order is on its way',
          timeRange: '20:45 – 21:00',
          showReview: false,
        };
      case 'Delivered':
        return {
          message: 'Delivered',
          subMessage: 'Your order has been delivered',
          timeRange: 'Delivered',
          showReview: true,
        };
      default:
        return {
          message: 'Unknown status',
          subMessage: '',
          timeRange: '',
        };
    }
  };
  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        userId: user?.email,
        rating,
        review,
      };

      // Show loading alert
      Swal.fire({
        title: 'Submitting your review',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axiosPublic.post('/api/reviews', reviewData);

      if (response.data.success) {
        // Success alert
        Swal.fire({
          icon: 'success',
          title: 'Thank you!',
          text: 'Your review has been submitted successfully',
          confirmButtonColor: '#3085d6',
          timer: 3000,
        });

        // Close modal and reset form
        setShowReviewModal(false);
        setRating(0);
        setReview('');
      } else {
        // API returned success: false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message || 'Failed to submit review',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text:
          error.response?.data?.message ||
          'Something went wrong. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };
  const handleReviewClick = order => {
    setCurrentOrder(order);
    setShowReviewModal(true);
  };

  if (isLoading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Track Your Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const { message, subMessage, timeRange, showReview } =
              getStatusDetails(order.status);
            const canReview = showReview && !order.reviewed; // Only show if not already reviewed
            return (
              <div
                key={order._id}
                className="border rounded-lg shadow-sm bg-white"
              >
                {/* Header Section */}
                <div className="bg-gray-50 p-4 rounded-t-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Arriving by</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {timeRange}
                    </p>
                    <p className="text-md font-medium text-gray-700 mt-1">
                      {message}
                    </p>
                    <p className="text-sm text-gray-500">{subMessage}</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="https://via.placeholder.com/50.png?text=Cooking"
                      alt="Status Icon"
                      className="w-12 h-12"
                    />
                  </div>
                </div>

                {/* Order Details Section */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      {/* Food Images */}
                      {order.cart.slice(0, 2).map((item, index) => (
                        <img
                          key={index}
                          src={
                            item.image ||
                            (index === 0 ? foodImage1 : foodImage2)
                          }
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-pink-600">
                      Tk {order.total_amount}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-lg font-semibold text-gray-800">
                      Kacchi Ghar - Banani
                    </p>
                    <p className="text-sm text-gray-500">
                      Order number #{order._id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Delivery Address:
                    </p>
                    <p className="text-sm text-gray-700">
                      {order.info.cus_add1}, {order.info.cus_city},{' '}
                      {order.info.cus_country}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Dhaka</p>
                    <p className="text-sm text-gray-700">
                      Flat Number: Block F road-1 house-5
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Note to rider: none
                    </p>
                    <p className="text-sm text-gray-700">less</p>
                  </div>

                  {/* Items Summary */}
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      View Details ({order.cart.length} items)
                    </p>
                    <p className="text-lg font-semibold text-pink-600">
                      Tk {order.total_amount}
                    </p>
                  </div>
                </div>

                <div className="mx-auto w-1/2">
                  {canReview && ( // Added this button conditionally
                    <button
                      onClick={() => handleReviewClick(order)}
                      className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Rate & Review
                    </button>
                  )}
                </div>

                {/* Background Image */}
                <div
                  className="h-32 bg-cover bg-center rounded-b-lg"
                  style={{ backgroundImage: `url(${backgroundFoodImage})` }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Rate your order</h3>

            <div className="mb-4">
              <p className="mb-2">Rating:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="review" className="block mb-2">
                Review:
              </label>
              <textarea
                id="review"
                rows="4"
                className="w-full p-2 border rounded"
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="Share your experience..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                disabled={rating === 0}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
