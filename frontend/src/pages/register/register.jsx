
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import RegisterImage from "../../register.png";
import { Fetch } from "../../services/logic.js";
import { fetchUser } from "./registerSlices.js"
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';



export const Register = () => {
    const [formData, setFormData] = useState({

        firstName: "alaa",
        lastName: "almedane",
        username: "alaaalmedane",
        gender: "Male",
        phoneNumber: "0934552101",
        email: "alaaalmedane@gmail.com",
        image: null,
        skills: "js,node",
        address: "daria",
        password: "alaa@Alaa1",
        cv: null,
    });
    const dispatch = useDispatch()
    const state = useSelector(state => state.register)
   
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
        const form = new FormData()
        console.log(formData)
        for (const key in formData) {
            if (key === 'skills') {
                console.log(formData[key].split(','))
                form.append(key, formData[key].split(','))
            } else {
                form.append(key, formData[key])
            }
        }
        console.log(form)
        dispatch(fetchUser(form))

    };
    if (state.data) {
        if (state.data.ok) {

            navigate('/login');
        }

    }
    return (
        <div className="flex flex-row items-center justify-center min-h-screen w-screen bg-violet-950 p-20  ">
            <img src={RegisterImage} alt={"2"} className="w-1/2 " />


            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 align-middle justify-center rounded-lg shadow-md w-1/2"
            >
                <h2 className="text-lg font-bold mb-4">Register</h2>

                <CustomInput
                    handleChange={handleChange}
                    name="firstName"
                    label={"First Name"}
                    value={formData.firstName}
                />
                <CustomInput
                    handleChange={handleChange}
                    name="lastName"
                    label={"Last Name"}
                    value={formData.lastName}
                />
                <CustomInput
                    handleChange={handleChange}
                    name="username"
                    label={"Username"}
                    value={formData.username}
                />
                <label className="mb-2">Gender</label>

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <CustomInput
                    type={"tel"}
                    handleChange={handleChange}
                    name="phoneNumber"
                    label={"Phone"}
                    value={formData.phoneNumber}
                />

                <CustomInput
                    type={"email"}
                    handleChange={handleChange}
                    name="email"
                    label={"E-mail"}
                    value={formData.email}
                />


                <CustomInput
                    handleChange={handleChange}
                    name="skills"
                    label={"Skills"}
                    value={formData.skills}
                />

                <CustomInput
                    handleChange={handleChange}
                    name="address"
                    label={"Address"}
                    value={formData.address}
                />

                <CustomInput
                    handleChange={handleChange}
                    name="password"
                    label={"Password"}
                    value={formData.password}
                />

                <label
                    htmlFor="cv"
                    className="flex font-semibold"
                >
                    CV
                </label>
                <input
                    type="file"
                    name="cv"
                    id="cv"
                    onChange={handleChange}
                    className="w-full mb-4"
                    style={{ display: "block" }}
                />
                <label
                    htmlFor="cv"
                    className="flex font-semibold"
                >
                    Image
                </label>

                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleChange}

                />

                {
                    state.data ? !state.data.ok ?
                        Object.entries(state.data.validation).map(([field, message]) => (
                            <div key={field} className="error-message text-red-700 mt-3">
                                <b>{field}</b> : {message}
                            </div>
                        )) : <></> : <></>}

                {state.loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box> :
                    <button
                        type="submit"
                        className="w-full bg-purple-500  text-white p-2 rounded hover:bg-purple-600 mt-5"
                    >
                        Register
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
