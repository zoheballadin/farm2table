import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import Modal from './Productadd'



function Header() {
  let token = localStorage.getItem("token")
  token = JSON.parse(token)
  return (
    <>

<header>
  <div id="header">
    <div className="header-logo">
      <Link href="indext.html">
        <img className='w-28' src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680686958/Screenshot_from_2023-04-05_14-58-01-removebg-preview_di9xm4.png" alt="" />
      </Link>
    </div>
    <div className="header-list">
      <nav className="header-list-nav">
        <ul>
          <li>
            <Link className="active" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="#">Add</Link>
          </li>
          {token && <li>
            <Link to={token.role=="buyer"  ? "/user/orders" : "/seller/orders"}>My orders</Link>
          </li>}
          <li>
            <Link to="contact.html">Contact</Link>
          </li>
          <li>
            <Link to="about.html">Signout</Link>
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