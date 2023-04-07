import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
   address: ""
  });

  let { fullname, email, phone, password, password2, bio, profession } =
    userData;

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    try {
        e.preventDefault()
      let { data } = await axios.post("/api/user/register", userData);
      toast.success(data.message)
    //   navigate("/login");
    } catch (error) {
      console.log(error.response.data)
      if(error.response.data.errors[0].msg)
        toast.error(error.response.data.errors[0].msg)
    else
    toast.error(error.response.data.error)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen bg-gradient-to-tr from-cyan-300 to-fuchsia-600 py-6 flex flex-col justify-center sm:py-12"
    >
      <div className="relative   sm:max-w-6xl md:w-7/12 sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold text-center -mt-6 mb-3">
                Register
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 -mb-16">
                <div className="relative flex flex-wrap lg:flex-nowrap -ml-12 space-x-16 ">
                  <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="fullname"
                    name="fullname"
                    type="text"
                    className="peer  inline md:block  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Name"
                  />
                  <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer   inline md:block h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email"
                  />
                  {/* <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your Name</label> */}
                </div>
                <div className="relative flex -ml-12 flex-wrap lg:flex-nowrap space-x-16">
                
                  <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="phone"
                    name="phone"
                    type="text"
                    className="peer  inline  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Phone"
                  />
                  <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="address"
                    name="address"
                    type="text"
                    className="peer  inline h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Address"
                  />
                  {/* <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your Name</label> */}
                </div>
                <div className="relative  flex -ml-12 flex-wrap lg:flex-nowrap space-x-16">
                  <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer  inline  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="password2"
                    name="password2"
                    type="password"
                    className="peer  inline h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Confirm password"
                  />
                  {/* <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter your Name</label> */}
                </div>
                <input
                    onChange={onChangeHandler}
                    autoComplete="off"
                    id="bio"
                    name="bio"
                    type="text"
                    className="peer  inline h-10 w-[33vw] -ml-12  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Enter a bio"
                    required
                  />
                <h5 className="mt-24">Are you a seller or buyer?</h5>

                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                onChange={onChangeHandler}
                  id="role"
                  name="role"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose an option</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                  
                </select>

                {/* <input
                  onChange={onChangeHandler}
                  autoComplete="off"
                  id="bio"
                  name="bio"
                  type="text"
                  className="-ml-12 peer w-[39.5vw]  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Bio"
                /> */}
                {/* <label class="w-full mx-auto flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-gradient-to-tr from-cyan-300 to-fuchsia-600 hover:text-white">
                  <svg
                    class="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">
                    Upload a profile picture
                  </span>
                  <input name="avatar" type="file" class="hidden" />
                </label> */}

                <div className="relative ">
                  <button
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-sky-500 ml-44 mt-3 -mb-28 text-white rounded-md px-2 py-1"
                  >
                    Submit
                  </button>
                </div>
                <ToastContainer/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
