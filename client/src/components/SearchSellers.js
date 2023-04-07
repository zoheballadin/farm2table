import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchSellers = () => {
  const text = useRef()
  const [sellers,setSellers] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchSellers = async ()=>{
      try {
        console.log(text.current)
        let token = localStorage.getItem("token");
                token = JSON.parse(token);
        const {data} = await axios.get('/api/admin/fetchsellers/'+ text.current.value,{
          headers : {
            'auth-token' : token
          }
        })
        console.log(data.sellers)
        setSellers(data.sellers)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSellers()
  },[])
  const search = async ()=>{
    try {
      let token = localStorage.getItem("token");
              token = JSON.parse(token);
      const {data} = await axios.get('/api/admin/fetchsellers',{params : {text : text.current.value} } ,{
        headers : {
          'auth-token' : token
        }
      })
      console.log(data.sellers)
      setSellers(data.sellers)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='text-4xl text-center my-6'>Search Sellers</div>
      <input
          ref={text}
          type="text"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter seller name"
          required
        />
        <button
          class="text-white mx-auto block my-4   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={search}
        >
          Search
        </button>
      <table class="table-fixed mr-auto ml-auto mt-12 w-[100vw]">
          <thead className="table-header-group">
            <tr>
              <th class="px-5 py-5 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">
                Name
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">
                Email
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">
                Address
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">
                Status
              </th>
              {/* <th>Responses</th> */}
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">
                Phone
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(
              (item, index) =>
                 (
                  <tr key={index + 1} className="table-row">
                    <td class="px-4 py-4 border-b border-gray-200 bg-white break-normal table-cell">
                      {item.fullname}
                    </td>
                    <td class="px-4 py-4 border-b border-gray-200 bg-white w-60 table-cell">
                      {item.email}
                    </td>
                    <td class="px-3 py-3 border-b border-gray-200 bg-white table-cell">
                      {item.address}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap table-cell">
                      {item.isApprove && "Approved"}
                    </td>
                    {/* <td>{item.responses}</td> */}
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-left table-cell">
                      {item.phone}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white table-cell">
                      <button
                        class="edit bg-blue-700 hover:bg-purple-700  text-white font-bold py-2 px-4 rounded border-b-2 text-center"
                        onClick={()=>navigate(`/vendor?user=${item._id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
          <tfoot className="h-10 flex items-center ">
            <tr className="col-span-4"></tr>
          </tfoot>
        </table>
      
    </div>
  )
}

export default SearchSellers
