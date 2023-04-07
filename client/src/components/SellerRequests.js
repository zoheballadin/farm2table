import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SellerRequests = () => {
    const [requests,setRequests] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchRequests = async ()=>{
            try {
                let token = localStorage.getItem("token");
                token = JSON.parse(token);
                const { data } = await axios.get(`/api/admin/requests`, {
                  headers: {
                    "auth-token": token.token,
                  },
                });
                console.log(data.requests)
                setRequests(data.requests)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRequests()
    },[])
  return (
    <div>
    <div className='text-4xl text-center my-4'>Pending Sellers</div>
      
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
                bio
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
            {requests.map(
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
                      {item.bio}
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

export default SellerRequests
