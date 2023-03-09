import React from 'react'
import Schedule from '../components/Schedule'
import SideNavTemp from '../components/SideNavTemp'

const Schedules = () => {
  return (
    <div>
      <div className="text hidden md:flex">
          <SideNavTemp/>
      </div>
      <div className="text">
          <Schedule/>
      </div>
    </div>
  )
}

export default Schedules