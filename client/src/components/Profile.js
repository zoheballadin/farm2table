import React, { useEffect, useState } from "react";
import Header from "./home/screen/Header";
import axios from "axios";

export const Profile = () => {
  const [user, setUser] = useState({});

  const onSubmit = async(e) =>{
    e.preventDefault()
    let token = JSON.parse(localStorage.getItem("token"))
    
    let {data} = await axios.put("api/user/edit",{}, {
        headers: {
            "auth-token": token.token
        }
    })
    alert(data.message)
    getUser()
  }

  const getUser = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      let { data } = await axios.get("/api/user/profile", {
        headers: {
            "auth-token": token.token
        }
      });
      setUser(data);
    } catch (error) {
        console.log(error)
    }
  };

  const onChange =e =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  useEffect(()=>{
    getUser()
  },[])
  return (
    <>
      <Header />
      <h1 className="text-center font-bold text-3xl my-20 mt-32">
        Profile Info
      </h1>
      <div className="flex">
        <div class="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
          <h2 class="text-center text-2xl font-bold tracking-wide text-gray-800">
            Your Profile
          </h2>

          <form class="my-8 text-sm">
            <div class="flex flex-col my-4">
              <label for="name" class="text-gray-700">
                Name
              </label>
              <h1 className="text-xl">{user.fullname}</h1>
            </div>

            <div class="flex flex-col my-4">
              <label for="email" class="text-gray-700">
                Email Address
              </label>
              <h2 className="text-xl">{user.email}</h2>
            </div>

            <div class="flex flex-col my-4">
              <label for="password" class="text-gray-700">
                Phone
              </label>
              <div
                x-data="{ show: false }"
                class="relative flex items-center mt-2"
              >
                <h2 className="text-xl">{user.phone}</h2>
              </div>
            </div>
            <div class="flex flex-col my-4">
              <label for="password" class="text-gray-700">
                Address
              </label>
              <div
                x-data="{ show: false }"
                class="relative flex items-center mt-2"
              >
                <h2 className="text-xl">{user.address}</h2>
              </div>
            </div>
            <div class="flex flex-col my-4">
              <label for="password" class="text-gray-700">
                Role
              </label>
              <div
                x-data="{ show: false }"
                class="relative flex items-center mt-2"
              >
                <h2 className="text-xl">{user.role}</h2>
              </div>
            </div>

            {/* <div class="my-4 flex items-center justify-end space-x-4">
              <button class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">
                Sign Up
              </button>
            </div> */}
          </form>
        </div>
        <div class="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
          <h2 class="text-center text-2xl font-bold tracking-wide text-gray-800">
            Edit Profile
          </h2>
          {/* <p class="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <a
              href="#"
              class="text-blue-600 hover:text-blue-700 hover:underline"
              title="Sign In"
            >
              Sign in here
            </a>
          </p> */}

          <form class="my-8 text-sm" onSubmit={onSubmit}>
            <div class="flex flex-col my-4">
              <label for="name" class="text-gray-700">
                Name
              </label>
              <input
              onChange={onChange}
                type="text"
                name="fullname"
                id="name"
                class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your name"
              />
            </div>

            <div class="flex flex-col my-4">
              <label for="email" class="text-gray-700">
                Email Address
              </label>
              <input
              onChange={onChange}
                type="email"
                name="email"
                id="email"
                class="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            <div class="flex flex-col my-4">
              <label for="password" class="text-gray-700">
                Phone
              </label>
              <div
                x-data="{ show: false }"
                class="relative flex items-center mt-2"
              >
                <input
                onChange={onChange}
                  name="phone"
                  id="phone"
                  class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your password"
                  type="text"
                />
              </div>
            </div>

            <div class="flex flex-col my-4">
              <label for="password_confirmation" class="text-gray-700">
                Address
              </label>
              <div
                x-data="{ show: false }"
                class="relative flex items-center mt-2"
              >
                <input
                onChange={onChange}
                  name="address"
                  id="address"
                  class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your password again"
                  type="text"
                />
              </div>
              <label

                for="countries"
                class="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Select an option
              </label>
              <select
              onChange={onChange}
                id="role"
                name="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            <div class="my-4 flex items-center justify-end space-x-4">
              <input type="submit" value="Edit" class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"/>
                
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
