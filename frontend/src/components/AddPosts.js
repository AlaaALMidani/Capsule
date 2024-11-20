import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { FaFileUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

import logo from '../styles/logo.png';
function AddPost({ onClose }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

    const handleProductNameChange = (e) => {
      setProductName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    // handle image upload
    const handleImageUpload = (e) => {
      const uploadedImage = e.target.files[0];
      if (uploadedImage) {
        setImage(URL.createObjectURL(uploadedImage));
      }
    };

    // handle file upload
    const handleFileUpload = (e) => {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        setFile(uploadedFile.name);
      }
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
          <h2 className="text-[#1a8942] font-semibold text-lg">Add New Post</h2>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={handleProductNameChange}
            className="w-full p-2 bg-gray-200 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#215f92] border-2"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            className="w-full h-32 p-2 bg-gray-200 rounded-lg placeholder-gray-500 resize-none focus:outline-none focus:border-[#215f92] border-2"
          />
        </div>

        {/* Add Photo/Video and File Upload Buttons Side by Side */}
        <div className="flex gap-4 mb-4">

          {/* Add Photo */}
          <div className="flex-1">
            <label htmlFor="upload-photo" className="w-full p-2 bg-gray-200 rounded-lg text-left text-gray-500 cursor-pointer flex items-center justify-center h-full hover:bg-[#e0f2e9]">
              {image ? (
                <img src={image} alt="Uploaded" className="h-16 object-cover rounded-lg" />
              ) : (
                <>
                  <FaCamera className="mr-2 text-[#215f92]" /> {/* أيقونة الكاميرا */}
                  <span>Add Photo/Video</span>
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

          {/* Add File */}
          <div className="flex-1">
            <label htmlFor="upload-file" className="w-full p-2 bg-gray-200 rounded-lg text-left text-gray-500 cursor-pointer flex items-center justify-center h-full hover:bg-[#e0f2e9]">
              {file ? (
                <span>{file}</span>
              ) : (
                <>
                  <FaFileUpload className="mr-2 text-[#215f92]" /> {/* أيقونة رفع الملف */}
                  <span>Add File</span>
                </>
              )}
            </label>
            <input
              type="file"
              id="upload-file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Post Button */}
        <div className="flex justify-end">
        <button
        onClick={handleSubmit}
        className="w-full bg-[#1a8942] text-white p-2 rounded-lg hover:bg-[#215f92] transition"
      >
        Post
      </button>
        </div>
      </div>
    );
  }

export default AddPost;