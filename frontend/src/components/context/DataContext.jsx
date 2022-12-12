import { useState } from "react";

import { createContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id:"",
    name:"",
    email:"",
    isAdmin: false
  });
  const [products, setProducts] = useState([]);
  const [listing, setListing] = useState({});
  const [cart, setCart] = useState([]);

  //CALL FETCH USERS IN EACH COMPONENTS

  const fetchProduct = async (id) => {
    const respone = await fetch(`/api/products/${id}`);
    const data = await respone.json();
    setListing(data);
  };

  const fetchProducts = async () => {
    const respone = await fetch("/api/products");
    const data = await respone.json();
    setProducts(data);
  };

  const sortProducts = (type) => {
    if (type === "high") {
      setProducts([...products.sort((a, b) => b.price - a.price)]);
    } else if (type === "low") {
      setProducts([...products.sort((a, b) => a.price - b.price)]);
    } else if (type === "review") {
      setProducts([...products.sort((a, b) => b.rating - a.rating)]);
    }
  };

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        sortProducts,
        cart,
        setCart,
        fetchProducts,
        fetchProduct,
        listing,
        setListing,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
