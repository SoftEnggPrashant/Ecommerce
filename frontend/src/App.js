import { Routes, Route } from "react-router-dom";
import Home from "./components/NavComponent/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Products from "./components/NavComponent/Products";
import Contact from "./components/NavComponent/Contact";
import About from "./components/NavComponent/About";
import SearchProduct from "./components/NavComponent/SearchProduct";
import Login from "./components/NavComponent/Login";
import Signup from "./components/NavComponent/Signup";
import Profile from "./components/NavComponent/Profile";
import Orders from "./components/Admin/Orders";
import UpdateProduct from "./components/Admin/UpdateProduct";
import "./App.css";
import { useEffect } from "react";
import CardDetail from "./components/card/CardDetail";
import PrivateRoute from "./components/CustomRoute/PrivateRoute";
import AdminRoute from "./components/CustomRoute/AdminRoute";
import Dashboard from "./components/Admin/Dashboard";
import CreateProduct from "./components/Admin/CreateProduct";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/UserActions";
import Users from "./components/Admin/Users";
import AdminProducts from "./components/Admin/AdminProducts";
import { Stack } from "@chakra-ui/react";
import Carts from "./components/Pages/Carts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/searchproduct" element={<SearchProduct />} />
        <Route path="/cardDetail/:id" element={<CardDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/carts"
          element={
            <PrivateRoute>
              <Carts />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/newProduct"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/updateProduct/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </Stack>
  );
}

export default App;
