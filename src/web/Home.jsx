import React from 'react'
import Header from './Header/Header'
import HomePage from './HomePage/HomePage'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Header/>
      <div className='mt-32'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home