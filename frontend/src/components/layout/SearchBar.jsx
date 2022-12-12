import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsBook } from "react-icons/bs";
import { useState } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const [text, setText] = useState();

  return (
    <div className="navbar w-100vw py-4 shadow-lg bg-neutral text-neutral-content flex flex-col lg:flex-row ">
      <div className="container mx-auto lg:w-1/4">
        <div className="py-2 mx-auto lg:mx-4 ">
          <BsBook className="inline pr-2 text-3xl " />
          <Link to="/" className="lg: text-2xl">
            The Book Store
          </Link>
        </div>
      </div>

      <div className="w-full mx-2 px-2  lg:w-4/5 ">
        <div className="w-full mx-auto">
          <div className="form-control ">
            <div className="relative ">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button
                type="button"
                className="absolute top-0 right-0 rounded-l-none btn btn-primary btn-lg"
                onClick={() => {
                  navigate(`/search/${text}`);
                }}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
