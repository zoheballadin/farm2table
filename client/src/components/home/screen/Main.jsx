import React from 'react'
import "./Main.css"


function Main() {
  return (
   <>      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>save more coupons & up to 70% off!</p>
        <button>Shop now</button>
      </section>

      <section id="features" className="section-p1">
        <div className="f-box">
          <img src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680682143/f1_vr0ihn.png" alt="free shipping" />
          <h6>Free shipping</h6>
        </div>
        <div className="f-box">
          <img src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680682147/f2_tfrsbw.png" alt="online order" />
          <h6>online order</h6>
        </div>
        <div className="f-box">
          <img src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680682152/f3_ved5hn.png" alt="save money" />
          <h6>save money</h6>
        </div>
        <div className="f-box">
          <img src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680682152/f3_ved5hn.png" alt="promotions" />
          <h6>promotions</h6>
        </div>
        <div className="f-box">
          <img src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680682158/f5_edyw1m.png" alt="happy sell" />
          <h6>happy sell</h6>
        </div>
        <div className="f-box">
          <img src="https://res.cloudinary.com/dgjmrmajh/image/upload/v1680682162/f6_m6l4m0.png" alt="24/7 support" />
          <h6>24/7 support</h6>
        </div>
      </section>
      </>

  )
}

export default Main