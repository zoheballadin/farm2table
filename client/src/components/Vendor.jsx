import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import { useNavigate } from "react-router-dom";

function Vendor() {
  const [userdata, setuserdata] = useState([]);
  const [productdata, setproddata] = useState([]);
  const isApprove = useRef();
  const querystring = window.location.search;
  const urlparams = new URLSearchParams(querystring);
  let userParam = urlparams.get("user");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function getSearchData() {
      let response = await axios.get(`/api/order/search/${userParam}`);
      console.log(response.data);
      let token = localStorage.getItem("token");
      token = JSON.parse(token);
      console.log(token.role);
      if (token.role == "admin") setIsAdmin(true);
      setuserdata(response.data.userdata);
      setproddata(response.data.products);
    }
    getSearchData();
  }, []);

  const approveOrReject = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;
      console.log(token);
      const { data } = await axios.post(
        "/api/admin/isapprove",
        { sellerId: userParam, isApprove: isApprove.current },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      alert(data.msg);
      navigate("/admin/home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {userdata.map((ele) => (
        <div className="bg-slate-700 w-full py-10 px-10">
          <div>
            <div className="sm:flex flex space-x-7 md:items-start items-center">
              <div className="mb-4">
                <img
                  className="rounded-md md:w-80"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMSlpNoD5Gn9XgMsLcq-wRfHQn-wnk38nTlBbT_x_C8x0rojGwh9qW77fhDsV-XksOI2s&usqp=CAU"
                  alt="brad"
                />
              </div>
              <div>
                <h1 className="text-slate-100 text-4xl font-bold my-2">
                  {ele.fullname}
                </h1>
                <p className="text-slate-100 text-lg tracking-wide mb-6 md:max-w-lg">
                  A farmer who wants to empower himself and sell his products
                  with the help of farm2table
                </p>
                <button className="border-2 px-6 py-4 rounded-md border-indigo-600 text-slate-100 hover:bg-indigo-600 hover:text-indigo-100 transition duration-75">
                  Role: {ele.role}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:space-x-4 flex">
            <div className="bg-slate-600 p-6 rounded-md mb-4">
              <span className="text-slate-400 text-md">Location</span>
              <h2 className="text-slate-100 text-2xl font-semibold">
                {ele.address}
              </h2>
            </div>
            <div className="bg-slate-600 p-6 rounded-md mb-4">
              <span className="text-slate-400 text-md">Phone No</span>
              <h2 className="text-slate-100 text-2xl font-semibold">
                {ele.phone}
              </h2>
            </div>

            {isAdmin && (ele.isApprove ? (
              <>
                <div
                  onClick={() => {
                    isApprove.current = false;
                    approveOrReject();
                  }}
                  className="bg-slate-600 p-6 rounded-md mb-4"
                >
                  <h2 className="text-slate-100 text-2xl font-semibold">
                    Remove User
                  </h2>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    isApprove.current = true;
                    approveOrReject();
                  }}
                  className="bg-slate-600 p-6 rounded-md mb-4"
                >
                  <h2 className="text-slate-100 text-2xl font-semibold">
                    Approve
                  </h2>
                </div>
                <div
                  onClick={() => {
                    isApprove.current = false;
                    approveOrReject();
                  }}
                  className="bg-slate-600 p-6 rounded-md mb-4"
                >
                  <h2 className="text-slate-100 text-2xl font-semibold">
                    Reject
                  </h2>
                </div>
              </>
            ))}

          </div>
          <div className=" lg:grid-cols-4 grid-cols-2 sm:gap-x-4">
            <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
              <div>
                <span className="text-md text-slate-400">Products</span>
                <h1 className="text-3xl font-bold text-slate-100">3</h1>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
              <div>
                <span className="text-md text-slate-400">Order Fulfilled</span>
                <h1 className="text-3xl font-bold text-slate-100">0</h1>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-600 p-6 rounded-md mb-4">
              <div>
                <span className="text-md text-slate-400">Email</span>
                <h1 className="text-3xl font-bold text-slate-100">
                  {ele.email}
                </h1>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-wrap">
            <List productdataset={productdata} />
          </div>
        </div>
      ))}
    </>
  );
}

export default Vendor;
