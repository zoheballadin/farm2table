import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Header from "./home/screen/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = ({ verifyToken }) => {
  let navigate = useNavigate();
  const name = useRef();
  const price = useRef();
  const description = useRef();
  const stock = useRef();
  const productImage = useRef();
  const [isapprove,setIsApprove] = useState(false)
  const addProduct = async (e) => {
    e.preventDefault();
    console.log(isapprove)
    if(isapprove == false)
      return toast.info('Your request is pending,')
    try {
      const formData = new FormData(e.target);
      // formData.append("name", name.current.value);
      // formData.append("price", price.current.value);
      // formData.append("category", category.current.value);
      // formData.append("description", description.current.value);
      // formData.append("stock", stock.current.value);
      // formData.append("productImage", productImage.current);
      try {
        const token = JSON.parse(localStorage.getItem("token")).token;
        const { data } = await axios.post("/api/product/add", formData, {
          headers: {
            "auth-token": token,
          },
        });
        console.log(data);
        navigate("/seller/products");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if(!file) return

    const extension = file[0].name.split(".").pop();
    if (
      extension != "jpeg" &&
      extension != "png" &&
      extension != "jpg" &&
      extension != "gif" &&
      extension != "tif" &&
      extension != "tiff" &&
      extension != "bmp" &&
      extension != "webp"
    ) {
      toast.error("select image type only");
    } else {
      productImage.current = file[0];
    }
  };

  useEffect(() => {
    verifyToken("seller");
    const fetch = async ()=>{
      try {
        const token = JSON.parse(localStorage.getItem('token')).token
        console.log(token)
        const {data}= await axios.get('/api/user/isapprove',{
          headers : {
            'auth-token' : token
          }
        })

        console.log(data.isapprove)
        setIsApprove(data.isapprove)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, []);

  return (
    <>
      <form
        onSubmit={addProduct}
        className="min-h-screen bg-gradient-to-tr from-cyan-300 to-fuchsia-600 py-6 flex flex-col justify-center sm:py-12"
      >
        <Header />
        <div className="relative   sm:max-w-6xl md:w-7/12 sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-3xl font-semibold text-center -mt-6 mb-3">
                  Add Product
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 -mb-16">
                  <div className="relative flex flex-wrap lg:flex-nowrap -ml-12 space-x-16 ">
                    <input
                      // onChange={onChangeHandler}
                      autoComplete="off"
                      id="name"
                      name="name"
                      ref={name}
                      type="text"
                      className="peer  inline md:block  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Name"
                      required
                    />
                    <input
                      // onChange={onChangeHandler}
                      autoComplete="off"
                      ref={price}
                      id="price"
                      name="price"
                      type="number"
                      className="peer   inline md:block h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Price"
                      required
                    />
                    {/* <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your Name</label> */}
                  </div>
                  <div className="relative flex -ml-12 flex-wrap lg:flex-nowrap space-x-16">
                    {/* <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your Name</label> */}
                    <input
                      // onChange={onChangeHandler}
                      autoComplete="off"
                      id="stock"
                      name="stock"
                      ref={stock}
                      type="number"
                      className="peer  inline  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Enter the stock available"
                      required
                    />
                  </div>
                  {/* <div className="relative  flex -ml-12 flex-wrap lg:flex-nowrap space-x-16"> */}
                  <input
                    // onChange={onChangeHandler}
                    autoComplete="off"
                    id="description"
                    name="description"
                    ref={description}
                    type="text"
                    className="peer  inline h-10 w-[28vw]  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Product description"
                    required
                  />

                  {/* <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your Name</label> */}
                  {/* </div> */}

                  <label class="w-full mx-auto flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-gradient-to-tr from-cyan-300 to-fuchsia-600 hover:text-white">
                    <svg
                      class="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">
                      Upload a picture
                    </span>
                    <input
                      accept="image/*"
                      name="productImage"
                      type="file"
                      class="hidden"
                      onChange={onFileChange}
                      required
                    />
                  </label>

                  <div className="relative ">
                    <button
                      type="submit"
                      className="bg-fuchsia-600 hover:bg-sky-500 ml-44 mt-3 -mb-28 text-white rounded-md px-2 py-1"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddProduct;
