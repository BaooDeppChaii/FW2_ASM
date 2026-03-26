import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
import ClientLayout from "./components/Client/ClientLayout";

// ADMIN
import Dashboard from "./pages/Admin/Dashboard";
import Category from "./pages/Admin/Category";
import ProductAdmin from "./pages/Admin/Product";
import User from "./pages/Admin/User";
import Order from "./pages/Admin/Order";

// CLIENT
import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import Cart from "./pages/Client/Cart";
import Register from "./pages/Client/Register";
import ProductClient from "./pages/Client/Product";
import Detail from "./pages/Client/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* CLIENT layout */}
        <Route path="/" element={<ClientLayout />}>

          <Route index element={<Home />} />

           <Route path="cart" element={<Cart />} />

          <Route path="login" element={<Login />} />

          <Route path="register" element={<Register />} />

          <Route path="product" element={<ProductClient />} />

          <Route path="detail" element={<Detail />} />

        </Route>


        {/* ADMIN */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/product" element={<ProductAdmin />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/order" element={<Order />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;