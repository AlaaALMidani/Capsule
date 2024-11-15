import React from 'react';
import { toast } from 'react-toastify';

const OfferManagement = () => {
  const handleNewOffer = () => {
    toast.success("New offer has been created!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Offer Management</h2>
      <button
        onClick={handleNewOffer}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Create New Offer
      </button>
    </div>
  );
};

export default OfferManagement;
