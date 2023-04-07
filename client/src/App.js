import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
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
import Vendor from "./components/Vendor";
import { Profile } from "./components/Profile";
import axios from "axios";
import { AdminLogin } from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import SellerRequests from "./components/SellerRequests";
import SearchSellers from "./components/SearchSellers";
import TC from "./components/home/screen/TC";

function App() {
  let navigate = useNavigate();

  const verifyToken = async (role) => {
    try {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      if (token.role !== role) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      let { data } = await axios.get("/api/user/auth", {
        headers: {
          "auth-token": token.token,
        },
      });
      console.log(data);
      if (data.role !== role) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem("token");
      navigate("/login")
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/addproduct" element={<Productadd />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      
      <Route path="/vendor" element={<Vendor />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/user/orders" element={<UserOrders verifyToken={verifyToken}/>} />
      <Route path="/seller/orders" element={<SellerOrders verifyToken={verifyToken}/>} />
      <Route path="/seller/products" element={<SellerProducts verifyToken={verifyToken}/>} />
      <Route path="/user/order/:orderId" element={<OrderInfo verifyToken={verifyToken}/>} />
      <Route path="/product/add" element={<AddProduct verifyToken={verifyToken}/>} />
      <Route path="/signout" element={<Signout />} />
      <Route path="/seller/order/:orderId" element={<OrderInfoSeller verifyToken={verifyToken} />} />
      
      //admin
      <Route path="/admin/login" element={<AdminLogin />} />    
      <Route path="/admin/home" element={<AdminDashboard />} />    
      <Route path="/admin/requests" element={<SellerRequests />} />    
      <Route path="/admin/searchsellers" element={<SearchSellers />} />    


      

      <Route path="/seller/order/:orderId" element={<OrderInfoSeller />} />
      <Route path="/home/termsandcondition" element={<TC/>} />
    </Routes>
  );
}

export default App;
