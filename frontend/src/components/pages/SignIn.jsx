import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useEffect } from "react";

function SignIn() {
  const { user, setUser } = useContext(DataContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    toast(`Welcome back ${user.name}`);
    
    user.isAdmin && navigate("/admin") 
  }, [user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/users/signin", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        toast("Bad credential, please try again!");
        console.log(error.response);
        setFormData({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div className="container mx-auto py-24 flex flex-col items-center">
      <header className="font-bold text-2xl m-2  ">Welcome back!</header>
      <div className="w-full max-w-xs ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="post"
          action="/api/users/signin"
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              name="email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              name="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Dung Do. All rights reserved.
        </p>
      </div>
      <Link to="/sign-up" className="p-2 text-xl font-medium">
        Sign Up instead
      </Link>
    </div>
  );
}

export default SignIn;
