import React from 'react'
import './ne.css'
import * as motion from 'motion/react-client'
const New = () => {
  return (
    <div className='w-full h-auto flex justify-center my-8 max-2xl:block max-2xl:w-[700px] max-2xl:mx-auto'>
        <div className="relative w-auto max-2xl:block h-auto  mr-5">
            {/*  */}
            <motion.div
            initial={{opacity:0,left:'-200px'}}
            whileInView={{opacity:1,left:0}}
            transition={{duration:0.5}}
            className='relative'>
        <div className='w-[700px] overflow-hidden h-auto rounded-xl'>
                <img className='hover:scale-110  rounded-xl duration-700' src="https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_c_01.jpg" alt="" />
            </div>
            <div className='absolute top-10 left-8'>
                <p className='text-gray-400'>FRENCH DOOR REFRIGERATORS</p>
                <h4 className='text-2xl font-bold my-4'>mart Quad-Door <br /> Refrigerato.</h4>
                <p className='text-lg text-gray-500'>Whether you want to brighten up a dim <br /> hallway or add a statement  piece to the <br/> dining room.</p>
            </div>
            <div className='vo absolute bottom-0 w-40 rounded-tr-3xl text-center py-3 h-14 bg-white'>
                <button className='w-36 rounded-full h-9 bg-orange-500 text-white hover:bg-black duration-300'>Shop Now</button>
            </div>
            </motion.div>
            {/*  */}
            <motion.div
             initial={{opacity:0,left:'-200px'}}
             whileInView={{opacity:1,left:0}}
             transition={{duration:0.5,delay:0.2}}
            className='relative my-5'>

<div className='w-[700px] overflow-hidden h-auto rounded-xl'>
        <img className='hover:scale-110  rounded-xl duration-700' src="https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_c_03.jpg" alt="" />
    </div>
    <div className='absolute top-10 left-8'>
        <p className='text-gray-400'>FRENCH DOOR REFRIGERATORS</p>
        <h4 className='text-2xl font-bold my-4'>mart Quad-Door <br /> Refrigerato.</h4>
        <p className='text-lg text-gray-500'>Whether you want to brighten up a dim <br /> hallway or add a statement  piece to the <br/> dining room.</p>
    </div>
    <div className='vo absolute bottom-0 w-40 rounded-tr-3xl text-center py-3 h-14 bg-white'>
        <button className='w-36 rounded-full h-9 bg-orange-500 text-white hover:bg-black duration-300'>Shop Now</button>
    </div>
    </motion.div>
             
        </div>
        {/*  */}
        <motion.div
         initial={{opacity:0, scale:1.2}}
         whileInView={{opacity:1 ,scale:1}}
         transition={{duration:0.5}}
        className='h-auto w-auto relative  '>
            <div className='w-[700px] overflow-hidden h-auto rounded-xl'>
                <img className='hover:scale-110  rounded-xl duration-700' src="https://miniture.b-cdn.net/wp-content/uploads/2023/10/m11_c_02.jpg" alt="" />
            </div>
            <div className='absolute top-10 left-8'>
                <p className='text-gray-400'>FRENCH DOOR REFRIGERATORS</p>
                <h4 className='text-2xl font-bold my-4'>mart Quad-Door <br /> Refrigerato.</h4>
                <p className='text-lg text-gray-500'>Whether you want to brighten up a dim <br /> hallway or add a statement  piece to the <br/> dining room.</p>
            </div>
            <div className='vo absolute bottom-[18px] max-2xl:bottom-0 w-40 rounded-tr-3xl text-center py-3 h-14 bg-white'>
                <button className='w-36 rounded-full h-9 bg-orange-500 text-white hover:bg-black duration-300'>Shop Now</button>
            </div>
        </motion.div>


        </div>
  )
}

export default New