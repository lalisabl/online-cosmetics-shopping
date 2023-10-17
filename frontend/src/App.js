import "./App.css";

import Header from "./Components/Header/Header";
import Product from "./Components/Card/Product";
import ProductList from "./Components/Product/ProductList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Components/shared/loadingSVG";
import Dashboard from "./Components/Admin/AdminDashboard";
import Login from "./login";

function RouteEcommerce() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/products" element={<Product />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/" element={<Home />} />

          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
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
<<<<<<< HEAD
      <RouteEcommerce />
=======
      <Header />
      <Card />
>>>>>>> 519c2523d0d10b5a8848243a6777a5ab38b3e091
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
