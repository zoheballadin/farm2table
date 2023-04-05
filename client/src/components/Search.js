import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const text = useRef();
  const [result, setResult] = useState([]);
  const navigate = useNavigate()
  const search = async () => {
    try {
      let { data } = await axios.post("/api/product/search", {
        text: text.current.value,
      });
      console.log(data);
      setResult(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const product = async (productId)=>{
    console.log(productId)
    navigate('/product/' + productId)
  }
  return (
    <>
      <div>Search</div>
      <input type="text" ref={text} />
      <button onClick={search}>search</button>
      <br />
      <br />

      <div>
        {result.map((ele) => (
          <div onClick={()=>product(ele._id)}>
            <div>{ele.name}</div>
            <div>{ele.category}</div>
            <div>{ele.description}</div>
            <div>{ele.price}</div>
            <div>{ele.stock}</div>
            <div>{ele.seller.fullname}</div>
            <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
