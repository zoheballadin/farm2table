import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Search from "./components/Search";
import Product from "./components/Product2";
import { UserOrders } from "./components/UserOrders";
import { OrderInfo } from "./components/OrderInfo";
import AddProduct from "./components/AddProduct2";
import { SellerOrders } from "./components/SellerOrders";
import { OrderInfoSeller } from "./components/OrderInfoSeller";
import Home from "./components/home/screen/Home";
import Productadd from "./components/home/screen/Productadd";
import { SellerProducts } from "./components/SellerProducts";
import { Signout } from "./components/Signout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home/addproduct" element={<Productadd/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/product/:productId" element={<Product/>}/>
      <Route path="/user/orders" element={<UserOrders/>}/>
      <Route path="/seller/orders" element={<SellerOrders/>}/>
      <Route path="/seller/products" element={<SellerProducts/>}/>
      <Route path="/user/order/:orderId" element={<OrderInfo/>}/>
      <Route path="/product/add" element={<AddProduct/>}/>
      <Route path="/signout" element={<Signout/>}/>
      <Route path="/seller/order/:orderId" element={<OrderInfoSeller/>}/>


    </Routes>
  );
}

export default App;
