import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataContext from "../context/DataContext";

function Cart() {
  const { cart, setCart } = useContext(DataContext);
  const subTotal = cart.reduce(
    (prev, { price, quantity }) =>
      prev + parseInt(quantity) * parseFloat(price),
    0
  );
  const shipping = cart.reduce(
    (prev, { isFreeship }) => (isFreeship ? prev + 15 : prev),
    0
  );
  const tax = (subTotal * 0.12).toFixed(2);
  const total = parseFloat(subTotal) + parseFloat(shipping) + parseFloat(tax);

  const checkout = () => {
    setCart([]);
    toast("Order placed!");
  };
  const navigate = useNavigate();
  const handleRemove = (_id) => {
    const newCart = cart.filter((item) => item._id !== _id);
    toast('Item removed!')
    setCart(newCart);
  };
  return (
    <>
      <div>
        <div
          className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
          id="chec-div"
        >
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div
                className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
                <div
                  className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </div>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                  Cart
                </p>
                <div>
                  {cart.map((item) => (
                    <div
                      className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                      key={item._id}
                    >
                      <div className="w-1/4">
                        <img
                          src={item.image}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">
                            {item.itemName}
                          </p>
                          <select
                            className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                            onChange={(e) => {
                              setCart(
                                cart.map((cartItem) =>
                                  cartItem._id === item._id
                                    ? { ...cartItem, quantity: e.target.value }
                                    : cartItem
                                )
                              );
                            }}
                          >
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p
                              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                              onClick={() => handleRemove(item._id)}
                            >
                              Remove
                            </p>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ${subTotal}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ${shipping}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ${tax}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        ${total}
                      </p>
                    </div>
                    <button
                      onClick={() => checkout()}
                      className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
