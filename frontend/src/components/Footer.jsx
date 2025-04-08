import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <>
    <div className='w-full sm:h-screen px-6 sm:px-20 md:flex gap-3 sm:pt-[9vw] '>
        <div className="md:w-1/2 md:flex flex-col justify-between">
           <div className="md:w-24 uppercase md:text-6xl sm:text-5xl text-3xl font-semibold py-6">Contextual Intelligence</div>
        </div>
        {/* <div className="md:w-1/2">
            <h1 className='ms:text-7xl sm:text-6xl text-4xl py-6 '>Contributors</h1>
            <div className='px-5 py-5 text-2xl ' >Nirujogi Prudhvi</div>
            <div className='px-5 py-5 text-2xl ' >Majji Durga Prasad</div>
        </div> */}
    </div>
    <div className="footer w-full sm:flex justify-between items-center px-10 sm:px-20 pb-2">
     <div className="logo pb-2 w-0 sm:w-36">
        <img src={logo} alt=""  />
       </div>
      <div className="copyright test-3xl pb-2">@Sculpt design 2024.Legal terms</div>
      <div className="designed test-3xl pb-2">Designed by Prudhvi and Prasad</div>
    </div>
    
    </>
  )
}

export default Footer