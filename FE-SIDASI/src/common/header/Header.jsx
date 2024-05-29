import React from "react"
// import { Link } from "react-router-dom";
import "./Header.css"
import Head from "./Head"
import Search from "./Search"
import Navbar from "./Navbar"

const Header = ({ CartItem }) => {
  return (

    <>
      <Head />
      <Search CartItems={CartItem} />
      <Navbar />
      {/* <Link to="/Profil"></Link> */}
    </>
  )
}

export default Header
