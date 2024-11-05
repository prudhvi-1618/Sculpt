import React from 'react'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed z-[999] w-full px-20 py-8 font-['Neue_Montreal'] flex justify-between items-center">
       <div className="logo w-40">
        <img src={logo} alt=""  />
       </div>
       <div className="links flex gap-10 max-md:hidden">
        <a className={`text-lg capitalize font-light`}>Our work</a>
        <a className={`text-lg capitalize font-light`}>About us</a>
        <Link to='/login' className={`text-lg capitalize font-light`} >Sign in</Link>
       </div>
    </div>
  )
}

export default Navbar