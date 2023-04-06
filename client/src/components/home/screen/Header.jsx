import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import Modal from './Productadd'

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function Header() {
  let token = localStorage.getItem("token")
  token = JSON.parse(token)
  return (
    <>

<header>
  <div id="header">
    <div className="header-logo">
      <Link to={"/"}>
        <img className='w-28' src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680799451/Screenshot_from_2023-04-06_22-12-19-removebg-preview_t3tkzx.png" alt="" />
      </Link>
    </div>
    <div className="header-list">
      <nav className="header-list-nav">
        <ul>
          <li>
            {(!token || token.role=="buyer") ? <Link className="active" to="/">
              Home
            </Link> : <Link to="/seller/products">My products</Link>}
          </li>
          {(token && token.role=="seller") && <li>
            <Link to="/product/add">Add</Link>
          </li>}
          {token && <li>
            <Link to={(token && token.role=="buyer")  ? "/user/orders" : "/seller/orders"}>My orders</Link>
          </li>}
          {!token && <li>
            <Link to="/register">Signup</Link>
          </li>}
          {
            token && <li><Link to="/profile">Profile</Link></li>
          }
          <li>
            {token ? <Link to="/signout" >Signout</Link> : <Link to="/login" >Login</Link>}
          </li>
        </ul>
      </nav>
      <div className="header-list-icon">
        <Link href="">
          <i className="fa fa-bag-shopping" />
        </Link>
      </div>
    </div>
  </div>
</header>


    </>
  )
}

export default Header