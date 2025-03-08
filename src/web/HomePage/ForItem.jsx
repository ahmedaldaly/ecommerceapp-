import React from 'react'
import { RiCaravanLine } from "react-icons/ri";
import { PiCreditCardDuotone } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6"
import * as motion from 'motion/react-client'
const ForItem = () => {
  return (
    <div className='w-full h-auto flex flex-wrap justify-center'>

        <motion.div
        initial={{opacity:0 }}
        whileInView={{opacity:1 }}
        transition={{duration:0.5}}
        className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200 flex justify-center items-center text-4xl'>
                <RiCaravanLine/>
            </div>
            <div className='mx-2 '>
                <h4>Free Shipping</h4>
                <p>Free Shipping for orders</p>
            </div>
        </motion.div>

        <motion.div
         initial={{opacity:0 }}
         whileInView={{opacity:1 , }}
         transition={{duration:0.5,delay:0.5}}
        className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200  flex justify-center items-center text-4xl'>
                <PiCreditCardDuotone/>
            </div>
            <div className='mx-2'>
                <h4>Money Guarantee</h4>
                <p>Within 30 days</p>
            </div>
        </motion.div>

        <motion.div 
           initial={{opacity:0 }}
           whileInView={{opacity:1 }}
           transition={{duration:0.5,delay:1}}
        className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200  flex justify-center items-center text-4xl'>
                <FaRegCircleCheck/>
            </div>
            <div className='mx-2'>
                <h4>Online Support</h4>
                <p>24 hours a day, 7 days a week</p>
            </div>
        </motion.div>

        <motion.div
           initial={{opacity:0 }}
           whileInView={{opacity:1 }}
           transition={{duration:0.5,delay:1.5}}
        className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200  flex justify-center items-center text-4xl'>
                <PiCreditCardDuotone/>
            </div>
            <div className='mx-2'>
                <h4>Flexible Payment</h4>
                <p>Pay with Multiple Credit Cards</p>
            </div>
        </motion.div>

    </div>
  )
}

export default ForItem