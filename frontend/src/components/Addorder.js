import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import logo from '../styles/logo.png';

function AddOrder() {
  const [message, setText] = useState ('');
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-96 p-6 bg-white bg-opacity-15 border border-gray-400 rounded-lg mx-auto text-center">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        {/* <img src={logo} alt="Logo" className="w-20 h-20 mb-2" /> */}
        <h2 className="text-[] font-semibold text-lg">ORDER</h2>
      </div>

      {/* Form Container */}
      <div className="flex justify-between mb-6">
        {/* Text Box */}
        <textarea
          className="textarea textarea-success"
          placeholder="Add MEDICINE NAME"
          value={text}
          onChange={handleTextChange}
        />

        {/* Image Upload */}
        <div className="w-[45%] h-24 flex justify-center items-center bg-gray-100 border border-gray-300 rounded-lg cursor-pointer">
          <label htmlFor="upload-photo" className="cursor-pointer text-gray-500">
            {image ? (
              <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-sm flex flex-col items-center BORDER">
                <span>ADD PHOTO PRESCRIPTION</span>
                <span className="text-2xl">
                  <FiCamera className="text-2xl mt-1" />
                </span>
              </span>
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
      </div>

      {/* Submit Button */}
      <button className="w-full bg-[#1a8942] text-white p-2 rounded hover:bg-[#215f92] mt-5">Submit Order</button>
    </div>
  );
}

export default AddOrder;