import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import logo from '../styles/logo.png';
import { toast } from 'react-toastify';

function AddOrder() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = () => {
    toast.success('Post sent successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg mx-auto mt-10 border border-gray-300 text-center">

      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />
        <h2 className="text-[#1a8942] font-semibold text-lg">Order Now</h2>
      </div>


      {/* Form Container */}
      <div className="flex justify-between mb-6 text-center">
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
      <button
        onClick={handleSubmit}
        className="w-full bg-[#1a8942] text-white p-2 rounded-lg hover:bg-[#215f92] transition"
      > Submit Order </button>
    </div>
  );
}

export default AddOrder;