import "./App.css";

import Header from "./Components/Header/Header";
import Product from "./Components/Card/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Components/shared/loadingSVG";
import Dashboard from "./Components/Admin/AdminDashboard";
import Login from "./login";
import SellerDashboard from "./Components/seller/SellerDashboard";
import { OperationMessage } from "./Components/seller/ProductManagement";
import { ProductDetails } from "./Components/Card/ProductDetails";
import RegistrationForm from "./Components/shared/userRegistrationForm";
import Home from "./Components/Home/Home";
function RouteEcommerce() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/sellerDashBoard" element={<SellerDashboard />} />
          <Route index element={<Home />} />

          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
function Home() {
  return (
    <>
      <h1>hello home</h1>
    </>
  );
}
function App() {
  return (
    <div className="App">
      <RouteEcommerce />
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
