import React from 'react'
import DoctorComp from '../components/DoctorComp'
import SideNavTemp from '../components/SideNavTemp'

const Doctors = () => {
  return (
    <>
          <div className="dark:bg-slate-900">
             <SideNavTemp/>
          </div>
          <div className="text">
            <DoctorComp/>
          </div>
    </>

  )
}

export default Doctors
