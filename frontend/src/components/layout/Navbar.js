import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { userType, userPages } = useSelector((state) => state.user);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">MediConnect</Link>
        </div>

        <ul className="flex space-x-4">
          {userPages.map((page, index) => (
            <li key={index}>
              <Link
                to={`/${page.toLowerCase().replace(/ /g, '-')}`}
                className="hover:text-gray-200"
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-sm">
          {userType ? `Logged in as: ${userType}` : 'Guest'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
