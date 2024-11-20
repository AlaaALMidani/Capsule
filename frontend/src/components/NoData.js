import React from 'react';

const NoData = ({ message = "No data available" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      
      <p className="text-gray-500 text-lg font-medium">{message}</p>
    </div>
  );
};

export default NoData;