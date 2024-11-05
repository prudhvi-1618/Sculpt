import React from 'react'
import card1 from '../assets/card1.jpeg'
import card2 from '../assets/card2.jpeg'
import card3 from '../assets/card3.jpeg'

const Cards = () => {
  return (
    <div className='w-full md:h-screen md:px-20 px-10 md:py-3 py-10 md:flex justify-between items-center gap-2'>
      <div className="card-container md:w-1/2">
        <img src={card1} className="card w-full h-[50vh] mb-5 bg-[#004d43]  rounded-2xl" alt="" />
      </div>
      <div className="card-container md:w-1/2 flex justify-between items-center gap-2">
        <img src={card2} className="card w-1/2 h-[50vh] mb-5 bg-[#004d43] object-cover rounded-2xl" alt="" />
        <img src={card3} className="card w-1/2 h-[50vh] mb-5 bg-[#004d43] rounded-2xl" alt="" />
      </div>
    </div>
  )
}

export default Cards;