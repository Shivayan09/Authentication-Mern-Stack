import React, { useContext } from 'react'
import { assets } from '../assets/asset'
import { AppContext } from '../context/AppContext'

const Header = () => {
    const {userData} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-5 text-xl sm:text-3xl font-medium mb-5'>Hey {userData ? userData.name : 'Developer'}! <img src={assets.hand_wave} alt="" className='w-8 aspect-square'/></h1>
      <h2 className='text-3xl font-semibold mb-5 md:text-4xl'>Welcome to my application</h2>
      <p className='mb-8 max-w-md'>Lets start with a small tour and we will have you up and running in no time!</p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all duration-200 cursor-pointer'>Get Started</button>
    </div>
  )
}

export default Header
