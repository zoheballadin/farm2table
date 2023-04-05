import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from './home/screen/Header'
export const UserOrders = () => {
    let navigate = useNavigate()
    const [orders, setOrders] = useState([])

    const getOrders = async( ) =>{
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        let {data} = await axios.get("/api/order", {
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
    <>
    <Header/>
    <div class="main-event ml-5 px-4 sm:px-8  mt-16 ">
      
        <div class="eventTable py-8 ">
          <h2 class=" ml-60 mb-5 text-3xl font-bold leading-tight text-black-800 text-center">Your Orders</h2>
          <div>
      

          </div>
          <table class="table-fixed mr-auto ml-auto mt-12 w-[100vw]" >
            <thead className='table-header-group'>
              <tr>
                <th class="px-5 py-5 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider" >Product</th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider" >Quantity</th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">Price </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">Total</th>
                {/* <th>Responses</th> */}
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">Vendor</th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-purple-800 text-left text-s font-semibold text-white uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index + 1} className='table-row'>
                  <td  class="px-4 py-4 border-b border-gray-200 bg-white break-normal table-cell">{item.product.name}</td>
                  <td  class="px-4 py-4 border-b border-gray-200 bg-white w-60 table-cell">
                    {item.qty}
                  </td>
                  <td  class="px-3 py-3 border-b border-gray-200 bg-white table-cell">{item.price}</td>
                  <td  class="px-5 py-5 border-b border-gray-200 bg-white whitespace-nowrap table-cell">{item.total}</td>
                  {/* <td>{item.responses}</td> */}
                  <td  class="px-5 py-5 border-b border-gray-200 bg-white text-left table-cell">
                    {item.seller.fullname} 
                    {/* <DeleteOutline
                    //   onClick={() => onDelete(item._id)}
                      class="eventListDelete  h-10 w-7 ml-7 text-center"
                    /> */}
                  </td>
                  <td  class="px-5 py-5 border-b border-gray-200 bg-white table-cell">
                    <button
                       class="edit bg-blue-700 hover:bg-purple-700  text-white font-bold py-2 px-4 rounded border-b-2 text-center"
                       onClick={() => navigate(`/user/order/${item._id}`)}
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
      </>
  )
}
