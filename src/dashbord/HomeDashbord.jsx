import React from 'react'
import TopBar from './side&topbar/TopBar'
import SideBar from './side&topbar/SideBar'
import { Outlet } from 'react-router-dom'
const HomeDashbord = () => {
  return (
    <div>
      <TopBar/>
      <SideBar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default HomeDashbord