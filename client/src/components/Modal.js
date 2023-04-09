import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom'



export default function Modal({data}) {
  let navigate = useNavigate()
  let delivery_cost = 50
  if(data.qty >20){
    delivery_cost = 0
  }
const [showModal, setShowModal] = React.useState(false);

const order =async ()=>{
  try {
    let token =  JSON.parse(localStorage.getItem('token')).token
    console.log(token)
    console.log(data);
    const res = await axios.post('/api/order/add',
    {
      product : data.product,
      price : data.price,
      qty : +data.qty,
      address:data.address,
      delivery_date: data.delivery_date

    },
    
    {
      headers : {
        'auth-token' : token
      }
    })
    navigate("/user/orders")
  } catch (error) {
    console.error(error)
  }
}

let token =  JSON.parse(localStorage.getItem('token'))


  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Buy Now
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Order Confirmation
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="text-red-500">These are your order details and Please Proceed if Confirmed</p>
                  <p className="mt-2"><b>Delivery Cost</b>: {+data.qty <= 20 ? `${delivery_cost} has been charged as a delivery cost`: `Congrats you got free delivery`}</p>
                  <p className="mt-2"><b>Product Name</b>: {data.productname}</p>
                  <p className="mt-2"><b>Total Quantity</b>: {data.qty ? data.qty : "Quantity Should be mentioned" }</p>
                  <p className="mt-2"><b>Address</b>: {data.address ? data.address : "Please enter your delivery address"}</p>
                  <p className="mt-2"> <b>Price</b> : {data.price}</p>
                  <p className="mt-2"> <b>Total</b> : {+data.qty * data.price }</p>
                  <p className="mt-2"> <b>Delivery Day</b> : {data.delivery_date ? data.delivery_date : `Delivery date should be mentioned`}</p>

                
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    
                    Close
                  </button>

                  {token && token.role == "buyer" ? <button onClick={token ? order : ()=>navigate("/login")} class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Buy Now</button> : <h1 className='text-red-700'>This is a seller account. You need a buyer account to make purchases</h1>}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}