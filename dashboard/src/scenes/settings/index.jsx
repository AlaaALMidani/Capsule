// src/scenes/settings/index.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex items-center">
        <label className="mr-4">Enable Dark Mode</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="toggle toggle-accent"
        />
      </div>
    </div>
  );
};

export default Settings;
