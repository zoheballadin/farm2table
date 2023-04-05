import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Signout = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("token")
        navigate("/")
    },[])
  return (
    <div>Signout</div>
  )
}
