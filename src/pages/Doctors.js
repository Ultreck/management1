import React from 'react'
import DoctorComp from '../components/DoctorComp'
import SideNavTemp from '../components/SideNavTemp'

const Doctors = ({setallDoctorsData}) => {
  return (
    <>
    <div className="text bg-slate-100 dark:bg-slate-900 dark:text-white w-full h-screen">
          <div className="text ">
             <SideNavTemp/>
          </div>
          <div className="text">
            <DoctorComp/>
          </div>
    </div>
    </>

  )
}

export default Doctors
