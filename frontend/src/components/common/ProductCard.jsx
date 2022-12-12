import React from "react";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductCard({
  _id,
  itemName,
  price,
  rating,
  images,
  historicalSold,
  isFreeship,
  discount,
  categories,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="card static bg-base-100 shadow-xl"
      onClick={() => navigate(`/${_id}`)}
    >
      <figure className="mt-4">
        <img src={images} alt={itemName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title items-start">
          {itemName}
          <div className="badge hidden lg:block">-{discount}%</div>
        </h2>

        <div className="grid grid-cols-2">
          <StarRating selectedStars={rating} />
          <span className="hidden lg:inline">Sold {historicalSold}</span>
        </div>

        <div className="text-xl text-red-500 font-bold">${price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
