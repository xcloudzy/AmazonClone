import { React, useContext, useEffect } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { Logincontext } from "../context/ContextProvider";

const Navbar = () => {
  const { account, setAccount } = useContext(Logincontext);
  // console.log(account);

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("error");
    } else {
      // console.log("data");
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">sign in</NavLink>
          </div>
          {account ? (
            <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge badgeContent={account.carts.length} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>

                <p>Cart</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          )}
          {account ? (
            <Avatar className="avtar2" title={account.fname.toUpperCase()}>
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
