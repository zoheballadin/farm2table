import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from './home/screen/Header'
export const SellerProducts = () => {
    let navigate = useNavigate()
    const [orders, setOrders] = useState([])

    const deleteProd = async(id) =>{
      try {
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        let {data} = await axios.delete(`/api/product/${id}`, {
            headers: {
                "auth-token": token.token
            }
        })
        console.log(data)
        getOrders()
      } catch (error) {
        console.log(error)
      }
    }

    const getOrders = async( ) =>{
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        let {data} = await axios.get("/api/product/seller", {
            headers: {
                "auth-token": token.token
            }
        })
        setOrders(data)
    }

    useEffect(()=>{
        getOrders()
    },[])


  return (
    <div class="main-event ml-5 px-4 sm:px-8  mt-4 ">
      <Header/>
        <div class="eventTable py-8 mt-20">
          <h2 class=" ml-60 mb-5 text-3xl font-bold leading-tight text-black-800 text-center">Your Products</h2>
          <div>
      

          </div>
          <table class="table-fixed mr-auto ml-auto mt-12 w-[100vw]" >
            <thead className='table-header-group'>
              <tr>
                <th class="px-5 py-5 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider" >Product</th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider" >Price</th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">Stock </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">category</th>
                {/* <th>Responses</th> */}
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">Delete</th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index + 1} className='table-row'>
                  <td  class="px-4 py-4 border-b border-gray-200 bg-white break-normal table-cell">{item.name}</td>
                  <td  class="px-3 py-3 border-b border-gray-200 bg-white table-cell">{item.price}</td>
                  <td  class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap table-cell">{item.stock}</td>
                  {/* <td>{item.responses}</td> */}
                  <td  class="px-5 py-5 border-b border-gray-200 bg-white text-left table-cell">
                    {item.category} 
                    {/* <DeleteOutline
                    //   onClick={() => onDelete(item._id)}
                    class="eventListDelete  h-10 w-7 ml-7 text-center"
                  /> */}
                  </td>
                  <td  class="px-4 py-4 border-b border-gray-200 bg-white w-60 table-cell">
                  <button
                       class="edit bg-blue-700 hover:bg-purple-700  text-white font-bold py-2 px-4 rounded border-b-2 text-center"
                       onClick={() => deleteProd(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td  class="px-5 py-5 border-b border-gray-200 bg-white table-cell">
                    <button
                       class="edit bg-blue-700 hover:bg-purple-700  text-white font-bold py-2 px-4 rounded border-b-2 text-center"
                       onClick={() => navigate(`/product/${item._id}`)}
                    >
                      View
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot  className="h-10 flex items-center " >
            <tr className="col-span-4">

            </tr>
            </tfoot> 
          </table>
          

          {/* <button onClick={handleOpenAdd} class="add  bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded border-b-2 text-center absolute right-12 top-12 h-15 w-30 mr-3 mt-2 ">
            Add Post
          </button> */}

       
          
        </div>
      </div>

  )
}
