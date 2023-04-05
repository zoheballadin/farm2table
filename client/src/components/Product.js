import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {productId} = useParams()
    const [product,setProduct] = useState({
      name : '',
      imageUrl : ''
    })
    const quantity = useRef()
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
    if(window.confirm('Confirm buy\n' + 'quantity : ' + quantity.current.value + '\nprice : ' +product.price + '\ntotal : ' + product.price * quantity.current.value)){
      try {
        let token =  JSON.parse(localStorage.getItem('token')).token
        console.log(token)
        const {data} = await axios.post('/api/order/add',
        {
          price : product.price,
          qty : quantity.current.value
        },
        
        {
          headers : {
            'auth-token' : token
          }
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
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
      <span>Quantity</span><input ref={quantity} type='number'/>
      <button onClick={buy}>Buy Now</button><br/>
      <button >Chat</button>
    </>
  )
}

export default Product
