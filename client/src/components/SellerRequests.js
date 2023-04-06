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
    <div>requests</div>
      {requests.map(ele =>(
        <>
           <div onClick={()=>navigate(`/vendor?user=${ele._id}`)}> <span>{ele.fullname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{ele.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{ele.address}</span></div><br/>
        </>
      ))}
    </div>
  )
}

export default SellerRequests
