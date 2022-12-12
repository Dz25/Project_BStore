import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import { toast } from "react-toastify";

const BookViewer = () => {
  const { fetchProduct, listing } = useContext(DataContext);
  const { _id } = useParams();

  useEffect(() => {
    fetchProduct(_id);
  }, []);
  // Obtain ISBN number of user's current book

  // My ISBN data comes from mockaroo, which does not provided with real ISBN.

  // const ISBN_num = listing.ISBN?.replace("-","")

  //This is for testing purpose
  const ISBN_num = "0738531367";
  const canvasRef = useRef();

  // Initialize loaded state as false
  const [loaded, setLoaded] = useState(false);
  // Create alert message if book not found in Google Database
  function alertNotFound() {
    toast("Can not find the book")
  }
  // Add a Google Books script tag and event listener if the tag has loaded
  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://www.google.com/books/jsapi.js";
    scriptTag.addEventListener("load", () => setLoaded(true));
    scriptTag.id = "google-script";
    document.body.appendChild(scriptTag);
  }, []);
  // Once Google Books has loaded, then create new instance of Default viewer and load book's information to viewer
  useEffect(() => {
    if (!loaded) return;
    else {
      if (window.viewer) {
        let viewer = new window.google.books.DefaultViewer(canvasRef.current);
        viewer.load("ISBN:" + ISBN_num, alertNotFound);
      } else {
        window.google.books.load();
        window.google.books.setOnLoadCallback(() => {
          let viewer = new window.google.books.DefaultViewer(canvasRef.current);
          window.viewer = viewer;
          viewer.load("ISBN:" + ISBN_num, alertNotFound);
        });
      }
    }
  }, [loaded]);
  return (
    <div>
      {loaded ? (
        <div className="p-1 m-2">
          <div
            ref={canvasRef}
            id="viewerCanvas"
            className=" mb-8 min-w-full h-[600px]"
          ></div>
        </div>
      ) : (
        "Script not loaded"
      )}
    </div>
  );
};

export default BookViewer;
