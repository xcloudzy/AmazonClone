import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      toast.error("Invalid Details 👎!", {
        position: "top-center",
        autoClose: 300,
      });
    } else {
      setData({ ...logdata, email: "", password: "" });
      toast.success("Login Successfull 😃!", {
        position: "top-center",
        autoClose: 300,
      });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-in</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="email"
                onChange={adddata}
                value={logdata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={logdata.password}
                placeholder="At least 6 char"
                id="password"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon</p>
          <NavLink to="/register">
            <button style={{ cursor: "pointer" }}>
              Create your Amazon Account
            </button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Sign_in;
