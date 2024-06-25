import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <img src="../../../public/amazon_PNG25.png" alt="" />
          </div>
          <div className="nav_Searchbaar">
            <input type="text" name="" id="" />
            <div className="search_icon"></div>
          </div>
        </div>
        <div className="right"></div>
      </nav>
    </header>
  );
};

export default Navbar;
