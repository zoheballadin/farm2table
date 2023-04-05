import axios from 'axios'
import React, { useRef } from 'react'

const AddProduct = () => {
    const name = useRef()
    const price = useRef()
    const category = useRef()
    const description = useRef()
    const stock = useRef()
    const productImage = useRef()
    const addProduct = async (e)=>{
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name',name.current.value)
            formData.append('price',price.current.value)
            formData.append('category',category.current.value)
            formData.append('description',description.current.value)
            formData.append('stock',stock.current.value)
            formData.append('productImage',productImage.current)
            try {
                const token = JSON.parse(localStorage.getItem('token')).token
                const {data} = await axios.post('/api/product/add',formData,
                {
                    headers : {
                        'auth-token' : token
                    }
                })
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onFileChange = (e)=>{
        e.preventDefault()
        const file = e.target.files
        const extension = file[0].name.split('.').pop()
        if(
            extension != "jpeg" &&
            extension != "png" &&
            extension != "jpg" &&
            extension != "gif" &&
            extension != "tif" &&
            extension != "tiff" &&
            extension != "bmp" &&
            extension != "webp"
        ){
            alert('select image type')
        }else{
            productImage.current = file[0]
        }
    }
  return (
    <>
      <div>Add Product</div>
      <form onSubmit={addProduct}>
      <input placeholder='product name' type='text' ref={name} name='name'  required></input><br/>
      <input placeholder='price' type='number' ref={price} name='price' required></input><br/>
      <select ref={category} name='category'>
        <option>vegetable</option>
        <option>fruits</option>
      </select><br/>
      <input placeholder='description' type='text' ref={description} name='description' required></input><br/>
      <input placeholder='stock' type='number' ref={stock} name='stock' required></input><br/>
      <input type='file' accept='image/*' name='productImage' onChange={onFileChange}></input><br/>
      <input type='submit' value={'Submit'}></input>
      </form>
    </>
  )
}

export default AddProduct
