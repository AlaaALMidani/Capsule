import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../styles/logo.png";
import { fetchUser } from "./registerSlices.js"
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../../components/CustomInput';

export const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "alaa",
        phoneNumber: "0934552101",
        password: "alaa@Alaa1",
    });

    const dispatch = useDispatch();
    const state = useSelector(state => state.register);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            if (key === 'skills') {
                form.append(key, formData[key].split(','));
            } else {
                form.append(key, formData[key]);
            }
        }
        dispatch(fetchUser(form));
    };

    if (state.data) {
        if (state.data.ok) {
            navigate('/login');
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-screen bg-white p-6 md:p-20">
            {/* Logo - Stack on small screens, side by side on medium screens and above */}
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <img src={logo} alt="Logo" className="w-1/2 md:w-auto" />
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2"
            >
                <h2 className="text-lg font-bold mb-4 text-center md:text-left">Register</h2>

                <CustomInput
                    handleChange={handleChange}
                    name="fullName"
                    label="Full Name"
                    value={formData.fullName}
                />
                <CustomInput
                    handleChange={handleChange}
                    name="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                />
                <CustomInput
                    handleChange={handleChange}
                    name="password"
                    label="Password"
                    value={formData.password}
                />

                {state.data && !state.data.ok && state.data.validation &&
                    Object.entries(state.data.validation).map(([field, message]) => (
                        <div key={field} className="error-message text-red-700 mt-3">
                            <b>{field}</b> : {message}
                        </div>
                    ))}

                {state.loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-[#1a8942] text-white p-2 rounded hover:bg-[#215f92] mt-5"
                    >
                        Register
                    </button>
                )}
            </form>
        </div>
    );
};
