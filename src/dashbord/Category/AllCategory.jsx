import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'; 
import cookie from 'js-cookie'
import BaseUrl from '../../../Api/BaseUrl';
const AllCategory = () => {
  const [category, setCategory] = useState([])
  useEffect(()=> {
    async function fetch(params) {
      try{
        await axios.get(`${BaseUrl}/api/vi/category`)
        .then((data)=>{
          console.log(data.data)
          setCategory(data.data)
        })
      }catch(err){err}   
    }
    fetch()
  },[])
const token  = cookie.get('token')
  async function delet(id) {
    try{
      await axios.delete(`${BaseUrl}/api/vi/category/${id}`,{
        headers:{
          authorization:`Bearer ${token}`,
        }
      }
      )
      .then((data)=>{
        
        setCategory((data)=> data.filter((category)=>category._id !==id))
      })
    }catch(err){err}   
  }
  return (
    <div className="w-full px-4 lg:px-28 flex flex-wrap justify-evenly gap-8 mt-11">
  {category.map((item, i) => (
    <motion.div
      key={item._id}
      className="w-full sm:w-60 md:w-64 flex flex-col items-center"
      initial={{opacity:0,marginTop:'300px'}}
      whileInView={{opacity:1 ,marginTop:'0px'}}
      transition={{ duration: 1, delay: i * 0.5 }}
    >
     
      <div className="w-40 h-40 rounded-full  bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-110">
        <img
          src={item.image.url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
    
      <div className="mt-4 text-center">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h4>
        <button
          className="px-5 py-2 bg-red-500 text-white text-sm font-medium rounded-md shadow hover:bg-red-600 transition-colors"
        onClick={()=>delet(item._id)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  ))}
</div>

  
  )
}

export default AllCategory