import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import StarRating from "../common/StarRating";
import { toast } from "react-toastify";

function ProductDetail() {
  const { cart, setCart, fetchProduct, listing } = useContext(DataContext);
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(_id);
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:p-3">
          <img
            src={listing?.images}
            alt={listing?.itemName}
            className="w-full"
          />
          {listing?.isFreeship && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold p-2">
              This item is qualified for free shipping. Don't miss this chance!
            </div>
          )}
        </div>

        <div className="text-2xl p-2 lg:pt-6">{listing?.itemName}</div>
        <div className="grid grid-cols-2 pt-2 py-2 lg:pt-6">
          <StarRating selectedStars={listing?.rating} />
          <span className="px-2"> | Sold {listing?.historicalSold}</span>
        </div>
      </div>
      <div className="text-2xl p-2 text-red-500 font-bold lg:pt-6">
        ${listing?.price}
      </div>

      <div className="flex items-center content-around gap-4 my-4 mx-2 ">
        <button
          className="btn btn-primary text-2xl"
          onClick={() => {
            toast("Added to cart");
            setCart((prev) => [...prev, { ...listing, quantity: 1 }]);
          }}
        >
          Add to Cart
        </button>
        <button
          className="btn btn-secondary text-2xl"
          onClick={() => navigate(`/preview/${listing._id}`)}
        >
          Preview
        </button>
      </div>

      <div
        tabIndex={0}
        className="collapse my-2 px-1 mx-1 collapse-plus border border-base-300 bg-base-100 rounded-box"
      >
        <div className="collapse-title text-xl font-medium">
          Item Desciption
        </div>
        <div className="collapse-content">
          <p>This is a testing description...</p>
        </div>
      </div>

      <div className="m-2">
        <span className="p-2 text-xl font-medium">Customer review</span>
        <div className="flex">
          <StarRating selectedStars={listing?.rating} />
          <span> | {listing?.rating} out of 5 stars</span>
        </div>
      </div>

      <form className="m-2 p-1">
        <label htmlFor="message" className="block mb-2 text-xl font-medium ">
          Review
        </label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>
      </form>
    </div>
  );
}

export default ProductDetail;
