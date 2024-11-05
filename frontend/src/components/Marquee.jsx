import React from 'react'

const Marquee = () => {
  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.05"  className="w-full py-20 bg-[#004d43] rounded-t-3xl " >
        <div className=" border-y-2 border-zinc-500 py-14 flex justify-center gap-10 overflow-hidden whitespace-nowrap ">
            <h1 className='text-[15vw]  leading-none uppercase tracking-tight font-["Neue_Montreal"] font-bold -my-[4vw]'>Forge minds</h1>
        </div>
    </div>
  )
}

export default Marquee