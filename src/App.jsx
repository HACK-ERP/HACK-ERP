import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./views/Products/Products";
import ProductDetails from "./views/ProductDetail/ProductDetails";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
