import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login/Login";
import { useAuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./views/Home/Home";
import ProductsList from "./views/Products/ProductsList";
import ProductDetails from "./views/Products/ProductDetails";
import ProductCreate from "./views/Products/ProductCreate";
import ProductEdit from "./views/Products/ProductEdit";


import MaterialList from "./views/Materials/MaterialsList";
import MaterialDetails from "./views/Materials/MaterialDetails";
import MaterialsCreate from "./views/Materials/MaterialsCreate";

function App() {
  const { isAuthenticationFetched } = useAuthContext();

  return (
    <div className="App">
      {!isAuthenticationFetched ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />

            {/* Productos */}

            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />

            {/* Materiales */}

            <Route path="/materials" element={<MaterialList />} />
            <Route path="/materials/:id" element={<MaterialDetails />} />
            <Route path="/materials/create" element={<MaterialsCreate />} />
{/*             <Route path="/materials/:id/edit" element={<ProductEdit />} /> */}
{/* 


            <Route path="/suppliers" element={<ProductsList />} />
            <Route path="/suppliers/:id" element={<ProductDetails />} />
            <Route path="/suppliers/create" element={<ProductCreate />} />

            <Route path="/clients" element={<ProductsList />} />
            <Route path="/clients/:id" element={<ProductDetails />} />
            <Route path="/clients/create" element={<ProductCreate />} />
            <Route path="/clients/:id/edit" element={<ProductEdit />} />

            <Route path="/orders" element={<ProductsList />} />
            <Route path="/orders/:id" element={<ProductDetails />} />
            <Route path="/orders/create" element={<ProductCreate />} />
            <Route path="/orders/:id/edit" element={<ProductEdit />} />

            <Route path="/budget" element={<ProductsList />} />
            <Route path="/budget/:id" element={<ProductDetails />} />
            <Route path="/budget/create" element={<ProductCreate />} />
            <Route path="/budget/:id/edit" element={<ProductEdit />} />
 */}

          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
