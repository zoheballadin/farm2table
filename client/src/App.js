import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Search from "./components/Search";
import Product from "./components/Product2";
import { UserOrders } from "./components/UserOrders";
import { OrderInfo } from "./components/OrderInfo";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/product/:productId" element={<Product/>}/>
      <Route path="/user/orders" element={<UserOrders/>}/>
      <Route path="/user/order/:orderId" element={<OrderInfo/>}/>
      <Route path="/product/add" element={<AddProduct/>}/>



    </Routes>
  );
}

export default App;
