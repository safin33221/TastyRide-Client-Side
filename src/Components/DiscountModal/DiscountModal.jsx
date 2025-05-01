import confetti from 'canvas-confetti';
import React, { useEffect, useState } from 'react';

const DiscountModal = ({ userEmail }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userEmail) return;

    const key = `discountModal_${userEmail}`;
    const alreadyShown = localStorage.getItem(key);

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem(key, 'true');
      }, 10000); // Show modal after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [userEmail]);

  const handleClaim = () => {
    setShowModal(false);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md text-center shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-pink-600 mb-3">
              🎉 Welcome Offer!
            </h2>
            <p className="text-gray-700 mb-4">
              Get <span className="text-pink-600 font-bold">20% OFF</span> on
              your first order.
            </p>
            <button
              onClick={handleClaim}
              className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
            >
              Claim Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountModal;
