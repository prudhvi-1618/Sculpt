import React from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    //md:h-screen
    <div data-scroll data-scroll-section data-scroll-speed="-.85" className='width-full pt-[10vw]'>
        <div className="text-structure  md:py-6 pt-20 sm:py-20 px-8 sm:px-20">
            {['WE CREATE','Knowledge','at Your Fingertips'].map((item,index)=>{
                return (
                    <div className='masker font-["Neue_Montreal"]'>
                        <div className="w-fit flex items-center ">
                         {index===1 && (
                         <motion.div 
                         initial={{width:0}}
                         animate={{width:"8vw"}}
                         transition={{ease:[0.76, 0, 0.24, 1],duration:0.8}}
                         className='w-[8vw]  h-[4.8vw] mx-1 bg-green-500 rounded-[6px] '></motion.div>)}
                         <div className='md:text-7xl sm:text-4xl text-4xl tracking-tight font-semibold uppercase '>{item}</div>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="mt-28 px-4 sm:px-20 py-2 sm:py-6 border-t-[1px] border-zinc-700 flex justify-end items-center">
                {["For the public and private companies","From the first pitch to IPO"].map((item,index)=>{
                    return(
                        <div className='text-md py-2 font-light tracking-tight'></div>
                    )
                })}
            <div className="start flex  items-center gap-1 cursor-pointer">
                <div className="px-4 py-2 border-2 border-zinc-700 rounded-full uppercase">
                    <Link to='/app'>start exploring</Link>
                </div>
                <div className="arrow w-9 h-9 rounded-full border-2 pr-1 border-zinc-700 flex justify-center items-center">
                    <FaArrowUpLong className='rotate-45'/>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default LandingPage