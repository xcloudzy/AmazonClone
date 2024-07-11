import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Logincontext } from "../context/ContextProvider";

const Cart = () => {
  const { account, setAccount } = useContext(Logincontext);
  const { id } = useParams();
  const history = useNavigate();
  const [inddata, setInddata] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getIndData();
  }, [id]);

  const getIndData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://amazon-server-sigma.vercel.app/getproductsone/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await res.json();
      setInddata(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching individual product data:", error);
      setError("Failed to fetch product data. Please try again later.");
      setLoading(false);
    }
  };

  const addtoCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://amazon-server-sigma.vercel.app/addcart/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ inddata }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await res.json();
      setAccount(data);
      setLoading(false);
      history("/buynow");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setError("Failed to add item to cart. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart_section">
      {inddata && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.url} alt="cart_img" />
            <div className="cart_btn">
              <button className="cart_btn1" onClick={addtoCart}>
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : ₹{inddata.price.mrp}</p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                ₹{inddata.price.mrp - inddata.price.cost}(
                {inddata.price.discount})
              </span>
            </p>
            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                Free Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Oct 8 -21{" "}
                </span>
                Details
              </h4>
              <p>
                Fastest Delivery :{" "}
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
                  {inddata.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
