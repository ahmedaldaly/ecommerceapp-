import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='w-full justify-evenly flex-wrap flex h-auto bg-black text-white py-16 mt-20'>
        <div>
            <p className='font-bold py-6'>Our Store</p>
            <p>Miniture is one of the biggest international <br /> fashion companies, one of the world’s largest <br /> distribution groups.</p>
            <div className='my-4 flex '>
                <div className='mx-2 hover:bg-orange-400 hover:border-hidden duration-300 border-2 w-12 h-12 rounded-full border-gray-200  flex justify-center items-center text-2xl'><FaFacebookF/></div>
                <div className='mx-2 hover:bg-orange-400 hover:border-hidden duration-300 border-2 w-12 h-12 rounded-full border-gray-200  flex justify-center items-center text-2xl'><BsTwitterX/></div>
                <div className='mx-2 hover:bg-orange-400 hover:border-hidden duration-300 border-2 w-12 h-12 rounded-full border-gray-200  flex justify-center items-center text-2xl'><AiOutlineInstagram/></div>
                <div className='mx-2 hover:bg-orange-400 hover:border-hidden duration-300 border-2 w-12 h-12 rounded-full border-gray-200  flex justify-center items-center text-2xl'><FaWhatsapp/></div>
            </div>
        </div>
    
        <div className=''>
          <h4 className='text-xl font-bold py-6'>Quick links</h4>
          <p className='text-lg mt-2'>My Acount</p>
          <p className='text-lg mt-2'>Shoping Card</p>
          <p className='text-lg mt-2'>Wishlist</p>
          <p className='text-lg mt-2'>Product Compare</p>
        </div>

        <div className=''>
          <h4 className='text-xl font-bold max-md:mx-9 py-6'>Let’s get in touch</h4>
          
          <p className='text-lg my-2 max-md:mx-9'>Sign up for our newsletter and receive 10% off <br /> your</p>
         <input type="text" className='w-72 pl-5 h-10 max-md:mx-9' placeholder='enter your email address' />
        </div>
        
        
    </div>
  )
}

export default Footer