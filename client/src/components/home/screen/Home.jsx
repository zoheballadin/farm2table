import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Card from "./Card";
import Main from "./Main";
import axios from "axios";
import { useState } from "react";

function Home() {
  const [userdata, setuserdata] = useState([]);

  const getUser = async () => {
    let { data } = await axios.get("/api/product");
    console.log(data);
    setuserdata(data);
  };

  const [searchinput, setSearch] = useState("");
  const [reload,setReload] = useState(false)
  const search = async (query) => {
    let { data } = await axios.post(`/api/product/search`, {
      text: query,
    });
    console.log(data);
    setuserdata(data.result);
  };

  useEffect(() => {
    getUser();
  }, [reload]);
  return (
    <>
      <Header />
      <hr className="mt-0" />
      <Main />
      <hr className="mt-4" />
      <hr />
      <hr />
      {/* <form className='mt-16' onSubmit={()=>search(searchinput)}>    */}
      <label
        for="default-search"
        class="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-96 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
<div class="flex justify-center">
  <input
    onChange={(e) =>{ searchinput && setReload(!reload) ;setSearch(e.target.value)}}
    type="search"
    id="default-search"
    class="w-1/2 p-4 pl-10 text-sm text-gray-900 border border-gray-100 drop-shadow-lg rounded-full focus:outline-none focus:drop-shadow-2xl "
    placeholder="Search for Iftar Boxes"
    required
  />
</div>
        <button
          class=" text-japan absolute right-96 bottom-1.5 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
          onClick={() => search(searchinput)}
        >
          Search
        </button>
      </div>
      {/* </form> */}
      <div className="flex">
        <Card orderdata={userdata} />
        {/* <Card/> */}
        {/* <Card/> */}
      </div>
      <hr className="mt-4" />
      <Footer />
    </>
  );
}

export default Home;
