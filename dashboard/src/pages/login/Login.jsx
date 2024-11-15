import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './loginSlices';
import LoginImage from '../../login.png';

export const Login = () => {
  const [formData, setFormData] = useState(
    {
      email: "alaaalmedane@gmail.com",
      password: "alaa@Alaa1"
    });
    
  const dispatch = useDispatch()
  const state = useSelector(state => state.login)

  const handleChange = (event) => {
    console.log(state)
    const { name, value, type, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    dispatch(login(formData))
  };
  if (state.data) {
    if (state.data.ok) {
      navigate('/profile');
    }

  }
  return (
    <div className="flex flex-row items-center justify-center min-h-screen w-screen bg-violet-950 p-20  ">
      <img src={LoginImage} alt={"2"} className="w-1/3" />


      <form
        onSubmit={handleSubmit}
        className=" flex flex-col bg-white p-6 align-middle justify-between rounded-lg shadow-md w-1/2 min-h-96"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>

        <CustomInput
          type={"email"}
          handleChange={handleChange}
          name="email"
          label={"E-mail"}
          value={formData.email}
        />

        <CustomInput
          handleChange={handleChange}
          name="password"
          label={"Password"}
          value={formData.password}
        />

        {
          state.data ? !state.data.ok ?

            <div className="error-message text-red-700 mt-3">
              {state.data.message}
            </div>
            : <></> : <></>}

        {state.loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box> :
          <button
            type="submit"
            className="w-full bg-purple-500  text-white p-2 rounded hover:bg-purple-600 mt-5"
          >
            LOGIN
          </button>}
      </form>
    </div>
  );
};

export const CustomInput = ({ type, name, value, label, handleChange }) => {
  return (
    <div className="block">
      <label className="mb-2 font-semibold">{label}</label>
      <input
        type={type ? type : "text"}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={name}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
    </div>
  );
}
