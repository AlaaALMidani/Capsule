// src/scenes/posts-management/index.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // import styles

const PostsManagement = () => {
  const [editorValue, setEditorValue] = useState('');

  const handleSavePost = () => {
    console.log('Post Saved:', editorValue);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Posts Management</h2>
      <ReactQuill
        value={editorValue}
        onChange={setEditorValue}
        className="mb-4"
      />
      <button 
        onClick={handleSavePost}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
      >
        Save Post
      </button>
    </div>
  );
};

export default PostsManagement;
