import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
//icons
import { BsHouse, BsPersonCircle, BsCart2 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) return true;
  };

  return (
    <nav className="navbar bg-neutral fixed bottom-0">
      <ul className="menu menu-horizontal p-0 flex justify-evenly w-full text-base-100 ">
        <li
          className="flex flex-col content-evenly items-center py-2"
          onClick={() => {
            navigate("/");
          }}
        >
          <BsHouse
            className="p-0"
            fill={pathMatchRoute("/") ? "#89cff0" : "#ffffff"}
          />
          <p className="text-l p-0 lg:text-xl">Home</p>
        </li>

        <li
          tabIndex="0"
          className="dropdown dropdown-top flex flex-col content-evenly items-center py-2  "
        >
          <BiCategory className="p-0" />
          <p className="text-l p-0 lg:text-xl">Categories</p>
          <ul
            tabIndex="0"
            className="dropdown-content z-0 menu p-2 shadow bg-neutral rounded-box my-3 "
          >
            <li
              className="m-2"
              onClick={() => {
                navigate("/fiction");
              }}
            >
              Fiction
            </li>
            <li
              className="m-2"
              onClick={() => {
                navigate("/nonFiction");
              }}
            >
              Non Fiction
            </li>
            <li
              className="m-2"
              onClick={() => {
                navigate("/kids");
              }}
            >
              Kids
            </li>
            <li
              className="m-2"
              onClick={() => {
                navigate("/youngAdults");
              }}
            >
              Young Adults
            </li>
          </ul>
        </li>

        <li
          className="flex flex-col content-evenly items-center py-2"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <BsCart2
            className="p-0"
            fill={pathMatchRoute("/cart") ? "#89cff0" : "#ffffff"}
          />
          <p className="text-l p-0 lg:text-xl">Cart</p>
        </li>

        <li
          className="flex flex-col content-evenly items-center py-2"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <BsPersonCircle
            className="p-0"
            fill={pathMatchRoute("/profile") ? "#89cff0" : "#ffffff"}
          />
          <p className="text-l p-0 lg:text-xl">Profile</p>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
