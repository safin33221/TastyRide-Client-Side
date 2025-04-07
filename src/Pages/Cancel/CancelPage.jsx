// frontend/src/components/CancelPage.jsx
import React from 'react';

const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-600">Payment Cancelled</h1>
        <p className="mt-4 text-gray-600">You cancelled the payment. Try again if needed.</p>
        <a href="/checkout" className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-white">
          Back to Checkout
        </a>
      </div>
    </div>
  );
};

export default CancelPage;