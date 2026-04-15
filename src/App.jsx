import { BrowserRouter, Routes, Route } from "react-router-dom";


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

import Shipping from "./pages/Client/Shipping";
import Warranty from "./pages/Client/Warranty";
import Support from "./pages/Client/Support";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="detail" element={<Detail />} />
          <Route path="giao-hang" element={<Shipping />} />
          <Route path="chinh-hang" element={<Warranty />} />
          <Route path="ho-tro" element={<Support />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/product" element={<ProductAdmin />} />
        <Route path="/admin/product/create" element={<ProductCreate />} />
      <Route path="/admin/product/update/:id" element={<ProductUpdate />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/user/create" element={<UserCreate />} />
          <Route path="/admin/user/update/:id" element={<UserUpdate />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/category/create" element={<CategoryCreate />} />
  <Route path="/admin/category/update/:id" element={<CategoryUpdate />} />
  <Route path="/admin/orders/:id" element={<OrderDetailAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;