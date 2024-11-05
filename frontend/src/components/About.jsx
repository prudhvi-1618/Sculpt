import React from 'react'

const About = () => {
  return (
    //bg-[#CDEA68]
    <div data-scroll data-scroll-section data-scroll-speed="-.1" className="p-20 bg-[#CDEA68] rounded-t-[20px] text-zinc-700">
      <div className="text-5xl tracking-tighter w-[74vw] ">
        {/* Unlock the power of intelligent search—discover precise answers from videos and web content with just one query.
         Dive into a seamless experience where context meets clarity. */}
        Experience the future of search — where your queries unlock deep insights from videos and web content instantly.
      </div>
      <div className="w-full mt-20 border-zinc-700 border-t-[1px] md:flex justify-between items-start">
        <div className="md:w-1/2 ">
          <div className="md:text-6xl text-3xl py-8">Our approach : </div>
          <button className='px-8 py-4 flex items-center gap-6 rounded-full bg-zinc-800  text-white uppercase'>
            read More
            <div className="w-2 h-2 bg-white rounded-full "></div>
          </button>
        </div>
        <div className="md:w-1/2 py-10">
          <div className="h-[70vh] md:w-[35vw] bg-[#b0c859] rounded-3xl"></div>
        </div>

      </div>
    </div>
  )
}

export default About