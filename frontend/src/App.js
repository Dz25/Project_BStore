import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//components
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/layout/NavBar";
import SearchBar from "./components/layout/SearchBar";
import Cart from "./components//pages/Cart";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import { DataProvider } from "./components/context/DataContext";
import ProductCategory from "./components/pages/ProductCategory";
import SignIn from "./components/pages/SignIn";
import ProductDetail from "./components/pages/ProductDetail";
import SignUp from "./components/pages/SignUp";
import BookViewer from "./components/pages/BookViewer";
import AdminPage from "./components/pages/AdminPage";
import PrivateRoutes from "./components/common/PrivateRoutes";
function App() {
  return (
    <DataProvider>
      <Router>
        <SearchBar />
        <Routes className="py-4">
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<PrivateRoutes />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<SignIn />} />
          <Route
            path="/fiction"
            element={<ProductCategory cat="fiction" isCat={true} />}
          />
          <Route
            path="/nonFiction"
            element={<ProductCategory cat="nonfiction" isCat={true} />}
          />
          <Route
            path="/kids"
            element={<ProductCategory cat="kids" isCat={true} />}
          />
          <Route
            path="/youngAdults"
            element={<ProductCategory cat="youngAdults" isCat={true} />}
          />
          <Route
            path="/search/:param"
            element={<ProductCategory isCat={false} />}
          />
          <Route path="/:_id" element={<ProductDetail />} />
          <Route path="/preview/:_id" element={<BookViewer />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
        <NavBar />
      </Router>
    </DataProvider>
  );
}

export default App;
