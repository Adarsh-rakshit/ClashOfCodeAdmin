import React, { useState } from 'react';
import authService from "../appwrite/Auth.js";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from '../store/authSlice.js';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData })).then(() => {
            navigate("/");
          });
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </div>
        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="w-full mt-4">
            <Input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email Address"
              {...register("email", { required: true })}
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="w-full mt-4">
            <Input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className={`px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-400"}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
