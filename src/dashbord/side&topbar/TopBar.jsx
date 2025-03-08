import React from 'react'
import * as motion from 'motion/react-client'
const TopBar = () => {
  return (
    <motion.div 
    initial={{opacity:0, marginTop:'-100px'}}
    animate={{opacity:1, marginTop:'0px'}}
    transition={{duration:1}}
    className='w-full h-20 shadow-sm flex justify-end p-4'>
      <img className='w-32 mr-10' src="https://miniture.b-cdn.net/wp-content/themes/miniture/assets/images/logo.svg" alt="" />
    </motion.div>
  )
}

export default TopBar