import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import logo from '../styles/logo.png';

function AddOffer() {
  const [message, setMessage] = useState ('');
  const [cost, setCost] = useState ('');

 

  return (
    <div className="w-96 p-6 bg-white bg-opacity-15 border border-gray-400 rounded-lg mx-auto text-center">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        {/* <img src={logo} alt="Logo" className="w-20 h-20 mb-2" /> */}
        <h2 className="text-[] font-semibold text-lg">offer</h2>
      </div>

      {/* Form Container */}
      <div className="flex justify-between mb-6">
        {/* Text Box */}
        <textarea
          className="textarea textarea-success"
          placeholder="Add MEDICINE NAME"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <textarea
          className="textarea textarea-success"
          placeholder="Add MEDICINE NAME"
          value={cost}
          onChange={(e)=>setCost(e.target.value)}
        />

       
      </div>

      {/* Submit Button */}
      <button className="w-full bg-[#1a8942] text-white p-2 rounded hover:bg-[#215f92] mt-5">Submit Order</button>
    </div>
  );
}

export default AddOffer;