import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {productId} = useParams()
    const [product,setProduct] = useState({
      name : '',
      imageUrl : ''
    })
    useEffect(()=>{
      const fetch = async ()=>{
        try {
          const {data} = await axios.get('/api/product/' + productId)
        console.log(data)
        setProduct(data)
        } catch (error) {
          console.log(error)
        }
      }
      fetch()
    },[])
    const buy = async ()=>{
      try {
        const {data} = await axios.post('/api/order/add',{
          headers : {
            'auth-token' : JSON.parse(localStorage.getItem('token')).token
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <div>Product</div>
      <img src={product.imageUrl} width={200}/>
      <div>{product.name}</div>
      <div>{product.category}</div>
      <div>{product.price}</div>
      <div>{product.stock}</div>
      <button onClick={buy}>Buy Now</button><br/>
      <button >Chat</button>
    </>
  )
}

export default Product
