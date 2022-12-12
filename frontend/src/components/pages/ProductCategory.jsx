import React from "react";
import { useContext,useState,useEffect,useMemo } from "react";
import DataContext from "../context/DataContext";
import ProductCard from "../common/ProductCard";
import ReactPaginate from 'react-paginate';
import { useLocation, useParams } from "react-router-dom";


function ProductCategory({ cat,isCat }) {

  const baseValue = useMemo(() => cat, [cat])
  const {param} = useParams()
  const {products,sortProducts, fetchProducts} = useContext(DataContext);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 24
  const location = useLocation()
  let filter;
  isCat ? filter = products.filter((product) => product.categories.toLowerCase() == cat.toLowerCase()) : filter= products.filter((product) => product.itemName.toLowerCase().includes(param.toLowerCase()))
  useEffect(()=>{
    // Fetch items from backend.
    fetchProducts()
  },[])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    
    isCat ? filter = products.filter((product) => product.categories.toLowerCase() == cat.toLowerCase()) : filter= products.filter((product) => product.itemName.toLowerCase().includes(param.toLowerCase()))
    setCurrentItems(filter.slice(itemOffset,endOffset))
    setPageCount(Math.ceil(filter.length) / itemsPerPage);
    console.log(currentItems.length)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemOffset, itemsPerPage,products,baseValue,location.key]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filter.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

    
  return (
    <div className="container mx-auto pb-16 px-2">
      <div className="flex my-2 py-2">
        {isCat ? <span className="text-2xl capitalize mr-auto">{cat}</span> : <span className="text-2xl capitalize mr-auto">There is {currentItems.length} items match your search</span> }
        
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Sort by
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-0 menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="m-1 " onClick={() => sortProducts("high")}>
                    Price: High to Low
            </li>
            <li className="m-1" onClick={() => sortProducts("low")}>
                Price:Low to High
            </li>
            <li className="m-1" onClick={() => sortProducts("review")}>
                Customer Review
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 md:grid-cols-3">
        {currentItems.map((product, index) => (
            <ProductCard
              key={index}
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
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className = {'flex py-8 mx-auto justify-center'}
        pageClassName = {'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
        activeClassName = {'py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'}
        previousClassName = {'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
        nextClassName = {'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
      />
    </div>
  );
}

export default ProductCategory;
