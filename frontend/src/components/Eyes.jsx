import React from 'react'
import main_card from '../assets/main_card.png'

const Eyes = () => {
  return (
    <div className='w-full eyes sm:h-[110vh] overflow-hidden'>
      <img data-scroll data-scroll-speed="-.7" src={main_card} alt="" className="w-full sm:h-[120vh] flex justify-center gap-8 items-center  bg-cover bg-center "/>  
    </div>
  )
}

export default Eyes;