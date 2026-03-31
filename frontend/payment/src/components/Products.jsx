import React from 'react'
import "../styles/Products.css"
import axios from "axios"

const Products = ({ data }) => {
    const checkoutHandler = async (amount) => {

    const { data: keyData } = await axios.get("/api/v1/getkey");
    const { key } = keyData;

    const { data: orderData } = await axios.post("/api/v1/payment/process", {
      amount
    });

    const { order } = orderData;

    // ✅ Razorpay options yahin banega
    const options = {
      key: key,
      amount: amount,
      currency: "INR",
      name: "TO Ramesh ",
      description: "Test Transaction",
      order_id: order.id, // ✅ correct
      callback_url: "/api/v1/paymentVerification",

      prefill: {
        name: "Ramesh Panchal",
        email: "test@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#F37254",
      },
    };

    // ✅ Razorpay open bhi yahin hoga
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className='products-container'>
      {data && data.map((item) => (
        <div className='product-card' key={item.id}>

          <img
            src={item.image}
            alt={item.title}
            className='product-image'
          />

          <h3 className='product-title'>{item.title}</h3>

          <p className='product-price'>
            price <strong>{item.price}</strong>
          </p>

          <button
            className='pay-button'
            onClick={() => checkoutHandler(item.price)}
          >
            pay {item.price}
          </button>

        </div>
      ))}
    </div>
  )
}

export default Products;