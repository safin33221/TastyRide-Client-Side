import React, { useEffect, useState } from 'react';

const DiscountModal = ({ userEmail }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!userEmail) return; // ইমেইল না থাকলে কিছু করো না

    const key = `discountModal_${userEmail}`;
    const alreadyShown = localStorage.getItem(key);

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem(key, 'true');
      }, 20000); // ১০ সেকেন্ড পরে দেখাও

      return () => clearTimeout(timer);
    }
  }, [userEmail]);
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md text-center shadow-lg animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
            >
              &times;
            </button>

            {/* Content */}
            <h2 className="text-3xl font-bold text-pink-600 mb-3">
              🎉 Welcome Offer!
            </h2>
            <p className="text-gray-700 mb-4">
              Get <span className="text-pink-600 font-bold">20% OFF</span> on
              your first order.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
            >
              Claim Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountModal;
