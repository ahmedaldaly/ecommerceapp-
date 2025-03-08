import React from 'react'
import image from '../../../public/aa.webp'
import './craft.css'
import * as motion from 'motion/react-client'
const Craft = () => {
  return (
    <motion.div
    initial={{opacity:0,marginTop:'200px'}}
    whileInView={{opacity:1, marginTop:0}}
    transition={{duration:1}}
    className='w-[70%] my-10 mx-auto max-lg:w-[90%] relative '>
        <img className=' w-[100%] h-auto object-fill rounded-2xl '
         src={image} alt="image" />
         <div className='one text-lg absolute top-0 right-0 text-center w-48  h-10 bg-white text-black'>Craft Own Furniture</div>
         <div 
         className='two max-md:w-64 max-md:text-base absolute top-9 rounded-l-full font-bold py-3 text-center text-xl w-96 h-16 bg-white right-0'>
          Your new forever favorites are here</div>
    </motion.div>
  )
}

export default Craft