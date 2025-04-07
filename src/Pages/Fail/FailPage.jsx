// frontend/src/components/FailPage.jsx
import React from 'react';

const FailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
        <p className="mt-4 text-gray-600">Something went wrong. Please try again.</p>
        <a href="/checkout" className="mt-6 inline-block rounded-md bg-gray-900 px-4 py-2 text-white">
          Back to Checkout
        </a>
      </div>
    </div>
  );
};

export default FailPage;