import "./App.css";
import Header from "./Components/Header/Header";
import Card from "./Components/Card/Card";
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
          <Route exact path="/products" element={<ProductList />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Card />
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
