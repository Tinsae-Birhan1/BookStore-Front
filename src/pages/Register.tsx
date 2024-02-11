import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Functions/actions/auth";

const Register = () => {
  useEffect(() => {
    // isPublic();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (email === "" || password === "" || name === "") {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    const data = {
      email,
      password,
      name
    };

    // Assuming HOST is defined somewhere
    const HOST: string = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${HOST}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success("Registration Successful");
        setIsLoading(false);
        navigate('/login');
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again later");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen w-full">
      <div className="hidden md:flex md:w-1/2">
        <img
          className="object-cover w-full h-full"
          src="https://m.media-amazon.com/images/I/51ymAvTk9hL._CLa|610%2C500|5170Utwqj-L.jpg%2C51Ga5GuElyL.jpg|0%2C0%2C277%2C500%2B333%2C0%2C277%2C500%2B138%2C0%2C333%2C500__._SX400_SY326_.jpg"
          alt="Register Image"
        />
      </div>
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md max-w-md md:mx-auto mt-4 md:mt-0">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Names</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline text-sm"
              type="text"
              name="name"
              placeholder="Names"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline text-sm"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline text-sm"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
            <input
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline text-sm"
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white uppercase text-sm font-semibold py-2 rounded flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <p className="text-xs mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
        <p className="text-xs mt-2">
          <Link to="/admin" className="text-red-600 font-semibold">Login as Admin</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
