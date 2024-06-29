import React, { useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";

const Sign_up = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form>
            <h1>Sign-Up</h1>
            <div className="form_data">
              <label htmlFor="fname">Your name</label>
              <input
                type="text"
                name="fname"
                onChange={adddata}
                value={udata.fname}
                placeholder="enter name"
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={adddata}
                value={udata.email}
                placeholder="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile</label>
              <input
                type="text"
                name="mobile"
                onChange={adddata}
                value={udata.mobile}
                placeholder="mobile"
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={udata.password}
                placeholder="At least 6 char"
                id="password"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                onChange={adddata}
                value={udata.cpassword}
                placeholder="Confirm Password"
                id="cpassword"
              />
            </div>
            <button className="signin_btn">Continue</button>
            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign In</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Sign_up;
