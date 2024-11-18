import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import { OrderServices } from "../services/orderServices.js"

function AddOrder({ onClose, token }) {
  const [medicine, setMedicine] = useState('');
  const [location, setlocation] = useState('');
  const [image, setImage] = useState(null);

  

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = { message: medicine , location:location }; 
      const response = await OrderServices.addOrder(data, token, image);
      console.log("Order Submitted:", response);
      onClose(); 
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return (
    <div className="w-full p-6 bg-white rounded-lg mx-auto text-center shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-green-600 mb-6">Add New Order</h2>

      {/* Text Area for Medicine Name */}
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Add Medicine Name"
        value={medicine}
        onChange={(e)=>setMedicine(e.target.value)}
      />
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="location"
        value={location}
        onChange={(e)=>setlocation(e.target.value)}
      />

      {/* Image Upload Section */}
      <div className="w-full h-32 flex justify-center items-center bg-gray-100 border border-gray-300 rounded-lg cursor-pointer mb-4">
        <label htmlFor="upload-photo" className="cursor-pointer text-gray-500 flex flex-col items-center">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <>
              <span className="text-sm">Add Photo Prescription</span>
              <FiCamera className="text-3xl mt-2" />
            </>
          )}
        </label>
        <input
          type="file"
          id="upload-photo"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit Order
      </button>
    </div>
  );
}

export default AddOrder;
