import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import ProductCard from "../common/ProductCard";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRef } from "react";

function AdminPage() {
  const edit = useRef(null);
  let idProduct;
  const { products, setProducts, fetchProducts, setUser } =
    useContext(DataContext);
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    images: "",
    isFreeship: false,
    discount: "",
    categories: "",
    ISBN: "",
  });
  const { itemName, price, images, isFreeship, discount, categories, ISBN } =
    formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onDelete = async (_id) => {
    console.log(_id);
    await axios.delete(`/api/products/${_id}`);
    setProducts(products.filter((product) => product._id != _id));
  };
  //product._id,product.itemName,product.price, product.rating, product.images, product.historicalSold, product.isFreeship, product.discount, product.categories
  const onEdit = (
    id,
    itemName,
    price,
    rating,
    images,
    historicalSold,
    isFreeship,
    discount,
    categories
  ) => {
    setFormData({
      itemName: itemName,
      price: price,
      images: images,
      isFreeship: isFreeship,
      discount: discount,
      categories: categories,
      ISBN: "",
    });
    idProduct = id;
    window.scrollTo({
      top: edit.current.offsetTop,
      behavior: "smooth",
    });
    console.log(idProduct);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(idProduct);
    let { data } = await axios.put(`/api/products/${idProduct}`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });

    fetchProducts();
    toast("Product edited sucessfully");
  };
  const onAdd = async (e) => {
    e.preventDefault();
    console.log(formData);
    let { data } = await axios.post("/api/products", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    });
    fetchProducts();
    toast("Added products sucessfully");
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="mx-auto container pb-24">
      <div className="p-2 text-3xl font-medium">Welcome back !</div>
      <button
        className="btn"
        onClick={() =>
          setUser({
            _id: "",
            name: "",
            email: "",
            isAdmin: false,
          })
        }
      >
        {" "}
        Sign out
      </button>
      <div className="m-2 p-2">
        <div>
          <span className="text-2xl font-medium pb-2">Add an product</span>
          <form
            action="/api/products/"
            method="post"
            onSubmit={onAdd}
            onChange={onChange}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="itemName"
              >
                Item name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="itemName"
                type="text"
                name="itemName"
                value={itemName}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Item price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                name="price"
                value={price}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="images"
              >
                Item images
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="images"
                type="text"
                name="images"
                value={images}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isFreeship"
              >
                Item freeship
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="isFreeship"
                type="text"
                name="isFreeship"
                value={isFreeship}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="discount"
              >
                Item discount percentage
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="discount"
                type="number"
                name="discount"
                value={discount}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categories"
              >
                Item categories
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categories"
                type="text"
                name="categories"
                value={categories}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ISBN"
              >
                ISBN
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ISBN"
                type="text"
                name="ISBN"
                value={ISBN}
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div>
          <span className="text-2xl font-medium pb-2">Edit an product</span>
          <form
            method="put"
            action="/api/products/"
            ref={edit}
            onChange={onChange}
            onSubmit={handleEdit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="itemName"
              >
                Item name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="itemName"
                type="text"
                name="itemName"
                value={itemName}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Item price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                name="price"
                value={price}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="images"
              >
                Item images
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="images"
                type="text"
                name="images"
                value={images}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isFreeship"
              >
                Item freeship
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="isFreeship"
                type="text"
                name="isFreeship"
                value={isFreeship}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="discount"
              >
                Item discount percentage
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="discount"
                type="number"
                name="discount"
                value={discount}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categories"
              >
                Item categories
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categories"
                type="text"
                name="categories"
                value={categories}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ISBN"
              >
                ISBN
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ISBN"
                type="text"
                name="ISBN"
                value={ISBN}
              />
            </div>
            <button className="btn btn-primary">Edit</button>
          </form>
        </div>

        <div className="text-xl font-medium">Items</div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 md:grid-cols-3">
          {products?.map((product, index) => (
            <div key={index}>
              <ProductCard
                _id={product._id}
                itemName={product.itemName}
                price={product.price}
                rating={product.rating}
                images={product.images}
                historicalSold={product.historicalSold}
                isFreeship={product.isFreeship}
                discount={product.discount}
                categories={product.categories}
              />
              <div className="p-2 flex justify-center ">
                <button
                  className="btn btn-warning"
                  onClick={() => onDelete(product._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    onEdit(
                      product._id,
                      product.itemName,
                      product.price,
                      product.rating,
                      product.images,
                      product.historicalSold,
                      product.isFreeship,
                      product.discount,
                      product.categories
                    )
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
