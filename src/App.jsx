import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from "./components/Client/ClientLayout";


import Dashboard from "./pages/Admin/Dashboard";
import Category from "./pages/Admin/Category";
import ProductAdmin from "./pages/Admin/Product";
import ProductCreate from "./pages/Admin/Product/create";
import ProductUpdate from "./pages/Admin/Product/update";

import User from "./pages/Admin/User";
import UserCreate from "./pages/Admin/User/create";
import UserUpdate from "./pages/Admin/User/update";
import Order from "./pages/Admin/Order";
import OrderDetailAdmin from "./pages/Admin/Order/OrderDetail";
import CategoryCreate from "./pages/Admin/Category/create";
import CategoryUpdate from "./pages/Admin/Category/update";

import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import Cart from "./pages/Client/Cart";
import Success from "./pages/Client/Success";
import Checkout from "./pages/Client/Checkout";
import Register from "./pages/Client/Register";
import ProductClient from "./pages/Client/Product";
import Detail from "./pages/Client/Detail";
import Profile from "./pages/Client/Profile";

import Shipping from "./pages/Client/Shipping";
import Warranty from "./pages/Client/Warranty";
import Contact from "./pages/Client/Contact";
import RequireAdmin from "./components/Admin/RequireAdmin";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>

        {/* CLIENT */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="Success" element={<Success />} />
          <Route path="Checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product" element={<ProductClient />} />
          <Route path="product/:id" element={<Detail />} />
          <Route path="giao-hang" element={<Shipping />} />
          <Route path="chinh-hang" element={<Warranty />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<RequireAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<ProductAdmin />} />
          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/update/:id" element={<ProductUpdate />} />
          <Route path="user" element={<User />} />
          <Route path="user/create" element={<UserCreate />} />
          <Route path="user/update/:id" element={<UserUpdate />} />
          <Route path="order" element={<Order />} />
          <Route path="category/create" element={<CategoryCreate />} />
          <Route path="category/update/:id" element={<CategoryUpdate />} />
          <Route path="orders/:id" element={<OrderDetailAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;