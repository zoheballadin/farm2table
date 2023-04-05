import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import Modal from './Productadd'

function Header() {
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
            <Link className="active" href="index.html">
              Home
            </Link>
          </li>
          <li>
            <Link to="#">Add</Link>
          </li>
          <li>
            <Link to="blog.html">Blog</Link>
          </li>
          <li>
            <Link to="about.html">Signout</Link>
          </li>
          <li>
            <Link to="contact.html">Contact</Link>
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