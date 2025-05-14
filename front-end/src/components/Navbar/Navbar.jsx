import React from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menu, setmenu] = useState("home");
  return (
    <>
      <div className="navbar">
        <img src={assets.logo12} alt="" className="logo" />
        <ul className="navbar-menu">
          <li
            onClick={() => setmenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </li>
          <li
            onClick={() => setmenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </li>
          <li
            onClick={() => setmenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-app
          </li>
          <li
            onClick={() => setmenu("contact us")}
            className={menu === "contact us" ? "active" : ""}
          >
            Contact us
          </li>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <img src={assets.basket_icon} alt="" />

          <button>Sign In</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
