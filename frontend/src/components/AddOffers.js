import React, { useState } from 'react';

function AddOffer({ onClose, order }) {
  const [message, setMessage] = useState('');
  const [cost, setCost] = useState('');

  return (
    <div className="w-96 p-6 bg-white border border-gray-400 rounded-lg mx-auto text-center">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="font-semibold text-lg">Add Offer</h2>
        {order && (
          <p className="text-gray-600 text-sm">
            For Order: <span className="font-bold">{order.message}</span>
          </p>
        )}
      </div>

      {/* Form */}
      <div className="flex flex-col space-y-4 mb-6">
        <textarea
          className="textarea textarea-success w-full"
          placeholder="Add Medicine Name"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <textarea
          className="textarea textarea-success w-full"
          placeholder="Add Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={onClose}
        className="w-full bg-[#1a8942] text-white p-2 rounded hover:bg-[#215f92] mt-5"
      >
        Submit Offer
      </button>
    </div>
  );
}

export default AddOffer;
