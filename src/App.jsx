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

import BudgetList from "./views/Sales/BudgetsList";
import BudgetForm from "./views/Sales/BudgetForm";
import BudgetDetail from "./views/Sales/BudgetDetail";

import UserList from "./views/Users/UsersList";
import UserCreate from "./views/Users/UserCreate";
import UserDetails from "./views/Users/UserDetails";
import UserEdit from "./views/Users/UserEdit";

import OTList from "./views/Production/OTList";
import OTDetails from "./views/Production/OTDetails";
import NotificationsList from "./views/Notifications/NotificationsList";
import NotificationDetails from "./views/Notifications/NotificationsDetail";

import SuppliersList from "./views/Suppliers/SuppliersList";
import SupplierCreate from "./views/Suppliers/SupplierCreate";
import SupplierDetails from "./views/Suppliers/SupplierDetails";
import SupplierEdit from "./views/Suppliers/SupplierEdit";

import MaterialRequirements from "./views/MaterialRequirements/MaterialRequirements";
import PurchaseMaterials from "./views/MaterialRequirements/PurchaseMaterials";




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

            {/* Budget routes */}

            <Route path="/budget" element={<BudgetList />} />
            <Route path="/budget/create" element={<BudgetForm />} />
            <Route path="/budget/:id" element={<BudgetDetail />} />

            {/* Users routes */}

            <Route path="/users" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="/user/:id/edit" element={<UserEdit />} />
            
            {/* OT */}
            <Route path="/ot" element={<OTList />} />
            <Route path="/ot/:id" element={<OTDetails />} />

            {/* Notifications routes*/}
            <Route path="/notifications" element={<NotificationsList />} />
            <Route path="/notification/:id" element={<NotificationDetails />} />

            {/* Suppliers routes */}
            <Route path="/suppliers" element={<SuppliersList />} />
            <Route path="/suppliers/:id" element={<SupplierDetails />} />
            <Route path="/suppliers/create" element={<SupplierCreate />} />
            <Route path="/suppliers/:id/edit" element={<SupplierEdit />} />

            {/* Puchases Orders */}
            <Route path="/purchases" element={<MaterialRequirements />} />
            <Route path="/purchases/:id/create/:material_id" element={<PurchaseMaterials />} />

          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
