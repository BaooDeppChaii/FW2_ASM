import { BrowserRouter, Routes, Route } from "react-router-dom";


import ClientLayout from "./components/Client/ClientLayout";


import Dashboard from "./pages/Admin/Dashboard";
import Category from "./pages/Admin/Category";
import ProductAdmin from "./pages/Admin/Product";
import User from "./pages/Admin/User";
import Order from "./pages/Admin/Order";
import CategoryCreate from "./pages/Admin/Category/create";
import CategoryUpdate from "./pages/Admin/Category/update";

import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import Cart from "./pages/Client/Cart";
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
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/category/create" element={<CategoryCreate />} />
        <Route path="/admin/category/update" element={<CategoryUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;