import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const OrderInfoSeller = ({ verifyToken }) => {
  let { orderId } = useParams();
  console.log(orderId);

  const [order, setOrder] = useState({
    product: {
      imageUrl: "",
    },
    buyer: {
      fullname: "",
    },
  });

  const status = useRef();
  const navigate = useNavigate();
  const getOrder = async () => {
    try {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      let { data } = await axios.get(`/api/order/${orderId}`, {
        headers: {
          "auth-token": token.token,
        },
      });
      setOrder(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setStatus = async () => {
    try {
      let token = localStorage.getItem("token");
      token = JSON.parse(token)
      
      let { data } = await axios.patch(`/api/order/${orderId}`, {status:status.current.value}, {
        headers: {
          "auth-token": token.token
        }
      });
      alert(data.message);
      getOrder()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken("seller");
    getOrder();
  }, []);
  const cancelOrder = async () => {
    try {
      if (window.confirm("cancel order")) {
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        let { data } = await axios.delete(`/api/order/${orderId}`, {
          headers: {
            "auth-token": token.token,
          },
        });
        alert("order cancelled");
        navigate("/seller/orders", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div class="flex justify-start item-start space-y-2 flex-col">
        <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Order #{order._id}
        </h1>
        <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
          {order.createdAt}
        </p>
      </div>
      <div class="mt-10  flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div class="flex shadow-lg flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Your Order
            </p>

            <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div class="pb-4 md:pb-8 w-full md:w-40">
                <img
                  class="w-full hidden md:block"
                  src={order.product.imageUrl}
                  alt="dress"
                />
                <img
                  class="w-full md:hidden"
                  src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                  alt="dress"
                />
              </div>
              <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div class="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                    {order.product.name}
                  </h3>
                  <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-lg dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300">
                        Category:{" "}
                      </span>{" "}
                      {order.product.category}
                    </p>
                    <p class="text-md dark:text-white leading-none text-gray-800">
                      <span class="dark:text-gray-400 text-gray-300 ">
                        Description:{" "}
                      </span>{" "}
                      {order.product.description}
                    </p>
                    {/* <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                <p class="text-sm dark:text-white leading-none text-gray-800"><span class="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p> */}
                  </div>
                </div>
                <div class="flex justify-between space-x-8 items-start w-full">
                  <p class="text-base dark:text-white xl:text-lg leading-6">
                    Rs. {order.price}{" "}
                  </p>
                  <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                    {order.qty} kg
                  </p>
                  <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                    Rs. {order.total}
                  </p>
                </div>
              </div>
            </div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Set Order Status
            </label>
            <select
              id="status"
              name="status"
              required
              ref={status}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
            </select>
            <button
              onClick={setStatus}
              className="mx-auto bg-blue-800 p-2 rounded-md mt-3 text-white"
            >
              Set Status
            </button>
          </div>
          <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div class="flex justify-between w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Order Status
                  </p>
                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                    {order.status}
                  </p>
                </div>
                <div class="flex justify-between w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Price per piece
                  </p>
                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                    Rs. {order.price}
                  </p>
                </div>
                <div class="flex justify-between items-center w-full">
                  <p class="text-base dark:text-white leading-4 text-gray-800">
                    Quantity{" "}
                  </p>
                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                    {order.qty} kg
                  </p>
                </div>
              </div>
              <div class="flex justify-between items-center w-full">
                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                  Rs. {order.total}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Buyer
          </h3>
          <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div class="flex flex-col justify-start items-start flex-shrink-0">
              <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  className="w-16"
                  src="https://kingstonplaza.com/wp-content/uploads/2015/07/generic-avatar.png"
                  alt="avatar"
                />
                <div class="flex justify-start items-start flex-col space-y-2">
                  <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {order.buyer.fullname}
                  </p>
                  <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                    joined {order.buyer.createdAt}
                  </p>
                </div>
              </div>

              <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="cursor-pointer text-sm leading-5 ">
                  {order.buyer.email}
                </p>
              </div>
            </div>
            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Address
                  </p>
                  <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {order.buyer.address}
                  </p>
                </div>
                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                    Mobile
                  </p>
                  <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {order.buyer.phone}
                  </p>
                </div>
                <div class="flex mb-8 justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  {/* <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Sent from</p>
              <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 mb-8 text-center md:text-left text-sm leading-5 text-gray-600">{order.buyer.address}</p> */}
                </div>
              </div>
              <div class="flex w-full justify-center items-center md:justify-start md:items-start mt-12">
                <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                  View Details
                </button>
                <button
                  onClick={cancelOrder}
                  class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
