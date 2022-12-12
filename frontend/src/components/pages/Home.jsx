import React, {useContext, useEffect} from "react";


import ProductCard from "../common/ProductCard";
import DataContext from "../context/DataContext";

function Home() {
  const {products, fetchProducts} = useContext(DataContext)
  const display = [...products]
  useEffect(()=>{
    fetchProducts()
    console.log("test")
  },[])
  return (
    <div className="container mx-auto pb-24  lg:my-3  ">
      <div
        className="hero min-h-screen mb- bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content z-auto text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Always the best price on brand new books</h1>
            
          </div>
        </div>
      </div>

      <div className="p-2 grid grid-cols-2 gap-8 mx-auto lg:grid-cols-4 md:grid-cols-3">
        {
           display.slice(0,24).map((product,index) => (
            <ProductCard
            key={index}
            _id = {product._id}
            itemName = {product.itemName}
            price ={product.price}
            rating ={product.rating}
            images ={product.images}
            historicalSold ={product.historicalSold}
            isFreeship ={product.isFreeship}
            discount ={product.discount}
            />
           ))   
        }
      </div>
    </div>
  );
}

export default Home;
