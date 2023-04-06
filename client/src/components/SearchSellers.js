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
      <div>Search Sellers</div>
      <input ref={text} placeholder='enter seller name'/><button onClick={search}>Search</button>
      {sellers.map(ele=>(
        <>
        <div onClick={()=>navigate(`/vendor?user=${ele._id}`)}> <span>{ele.fullname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{ele.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>{ele.address}</span></div><br/>
        </>
      ))}
    </div>
  )
}

export default SearchSellers
