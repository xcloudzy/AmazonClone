import React from "react";
import "./cart.css";
import { Divider } from "@mui/material";

const Cart = () => {
  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2021/7/EZ/TT/BA/781984/whatsapp-image-2021-07-30-at-3-18-34-pm-1--1000x1000.jpeg"
            alt="cart_img"
          />
          <div className="cart_btn">
            <button className="cart_btn1">Add to Cart</button>
            <button className="cart_btn2">Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>Fitness Gear</h3>
          <h4>Pigeon FAVOURITE Electric Kettle (1.5L, Silver, Black)</h4>
          <Divider />
          <p className="mrp">M.R.P. : ₹1195</p>
          <p>
            Deal of the Day : <span style={{ color: "#B12704" }}>₹625.00</span>
          </p>
          <p>
            You save : <span style={{ color: "#B12704" }}>₹570 (47%)</span>
          </p>
          <div className="discount_box">
            <h5>
              Discount : <span style={{ color: "#111" }}>Extra 10% off</span>
            </h5>
            <h4>
              Free Delivery :
              <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 -21 </span>
              Details
            </h4>
            <p>
              Fastest Delivery :
              <span style={{ color: "#111", fontWeight: 600 }}>
                Tomorrow 11AM
              </span>
            </p>
            <p className="description">
              About the Item :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                Eye-catching design in a glossy finish that keeps you connected
                yet comfortable through the day.Note : If the size of the earbud
                tips does not match the size of your ear canals or the headset
                is not worn properly in your ears, you may not obtain the
                correct sound qualities or call performance. Change the earbud
                tips to ones that fit more snugly in your ears.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
