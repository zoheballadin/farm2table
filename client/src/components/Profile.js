import React from "react";
import Header from "./home/screen/Header";

export const Profile = () => {
  return (
    <>
    <Header/>
      <h1 className="text-center font-bold text-3xl my-20 mt-32">Profile Info</h1>
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
              <h1 className="text-xl">Zoheb Alladin</h1>
            </div>

            <div class="flex flex-col my-4">
              <label for="email" class="text-gray-700">
                Email Address
              </label>
              <h2 className="text-xl">zoheballadin1@gmail.com</h2>
            </div>

            <div class="flex flex-col my-4">
              <label for="password" class="text-gray-700">
                Phone
              </label>
              <div
                x-data="{ show: false }"
                class="relative flex items-center mt-2"
              >
                <h2 className="text-xl">+918712128572</h2>
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
                <h2 className="text-xl">Hyderabad</h2>
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
                <h2 className="text-xl">Buyer</h2>
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

          <form class="my-8 text-sm">
            <div class="flex flex-col my-4">
              <label for="name" class="text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
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
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                
              </select>
            </div>

            <div class="my-4 flex items-center justify-end space-x-4">
              <button class="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
