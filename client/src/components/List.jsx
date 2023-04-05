import React from 'react'

function List({productdataset}) {
  return (
    <>
     <h1 className='text-center text-2xl bg-red-200'>List of Products of this Vendor</h1>
    {
        productdataset.map((ele)=>(
            <div>
    <div>
      <div className="px-32 py-20 bg-gray-100 grid  gap-10 mt-0">
        <div className="max-w-xs rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer">
          <div>
            <img
              src={ele.imageUrl}
              alt=""
            />
          </div>
          <div className="py-4 px-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-600">
             {ele.name}
            </h3>
            <h3 className="text-lg font-semibold text-gray-600">
             {ele.description}
            </h3>
            <h3 className="text-lg font-semibold text-gray-600">
             {"Stock Available:"+ele.stock}
            </h3>
            <p className="mt-4 text-lg font-thin">{"₹"+ele.price}</p>
          </div>
        </div>
      </div>
    </div>
            </div>
        ))
    }
   
  </>
  )
}

export default List