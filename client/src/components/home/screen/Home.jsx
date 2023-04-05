import React, { useEffect } from 'react'
import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import Main from './Main';
import axios from 'axios';
import { useState } from 'react';



function Home() {
    const [userdata,setuserdata] = useState([])

    const getUser = async() =>{
        let {data} = await axios.get("/api/product")
       console.log(data)
       setuserdata(data)
    }
    useEffect(async () => {
       getUser()
      },[]);
  return (
    <>
    <Header/>
    <hr className='mt-4'/>
    <Main/>
    <hr className='mt-4'/>
    <hr />
    <hr />
    
    <div className="flex">
    <Card orderdata = {userdata}/>
    {/* <Card/> */}
    {/* <Card/> */}
    </div>
    <hr className='mt-4' />
    <Footer/>
    </>
  )
}

export default Home