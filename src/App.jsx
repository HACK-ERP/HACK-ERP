import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import { useAuthContext } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './views/Home/Home'
import Product from "./views/Products/Products";
import ProductDetails from "./views/ProductDetail/ProductDetails";

function App() {
  const { isAuthenticationFetched } = useAuthContext();


  return (
    <div className='App'>
      {!isAuthenticationFetched ? (
        <div>Loading...</div>
      ) : (

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={<ProtectedRoute />}
          >
            <Route path='/' element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
        </Routes>

      )}
    </div>
  );
}

export default App;
