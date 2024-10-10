import React from "react";
import ReactDOM from "react-dom/client"
import App from './App.jsx';
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { Route, RouterProvider, createRoutesFromElements } from "react-router"
import store from "./redux/store";
import { Provider } from "react-redux";
import Profile from "./pages/User/Profile";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CategoryList from "./pages/Admin/CategoryList";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import ProductList from "./pages/Admin/ProductList";
import AllProducts from "./pages/Admin/AllProducts";
import ProductUpdate from "./pages/Admin/ProductUpdate";

//


//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register";
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<App />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />



      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* Admin auth */}

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />

      </Route>
    </Route>



  )
);




ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


