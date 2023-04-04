import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Search from "./components/Search";
import Product from "./components/Product";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/product/:productId" element={<Product/>}/>


    </Routes>
  );
}

export default App;
