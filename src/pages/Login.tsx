import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { login } from "../redux/Functions/actions/auth";
import { FaSpinner } from "react-icons/fa"; // Import loading spinner icon

const Login = () => {
  useEffect(() => {
    // isPublic();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true);

    const data = {
      email,
      password
    }
    const HOST: string = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(response);
    if (response.status === 200) {
      console.log(result);
      const { user } = result; // Extracting the user object from the response
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(JSON.stringify(user));
        toast.success("Login Successful");
        setIsLoading(false);
        navigate('/');
      } else {
        console.error("User object is missing in the response:", result);
        toast.error("Login failed: Unexpected server response");
        setIsLoading(false);
      }
    } else {

      toast.error("wrong credentials");
      setIsLoading(false);

    }


  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="hidden md:flex md:w-1/2">
        <img
          className="object-cover w-full h-full"
          src="https://m.media-amazon.com/images/I/51ymAvTk9hL._CLa|610%2C500|5170Utwqj-L.jpg%2C51Ga5GuElyL.jpg|0%2C0%2C277%2C500%2B333%2C0%2C277%2C500%2B138%2C0%2C333%2C500__._SX400_SY326_.jpg"
          alt="Login Image"
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md md:w-1/2">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username or Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 outline-none focus:shadow-outline text-sm"
              type="email"
              name="email"
              id="email"
              placeholder="Username or Email"
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
          <button
            type="submit"
            className={`w-full bg-green-500 text-white uppercase text-sm font-semibold py-2 rounded flex justify-center items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null} {/* Display loading spinner */}
            {isLoading ? 'Logging in...' : 'Login'} {/* Conditional text */}
          </button>
        </form>
        <p className="text-xs mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
        </p>
        <p className="text-xs mt-2">
          <Link to="/admin" className="text-red-600 font-semibold">Login as Admin</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
