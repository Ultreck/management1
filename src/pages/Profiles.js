import React from 'react';
import Profilecomp from '../components/Profilecomp';
import SideNavTemp from '../components/SideNavTemp';

const Profiles = ({profileData, setprofilePics}) => {
  return (
    <div className='flex bg-gray-100  dark:bg-slate-900 w-full'>
            <div>
                  <SideNavTemp profileData={profileData}/>
            </div>
            <Profilecomp profileData={profileData} setprofilePics={setprofilePics}/>
    </div>
  )
}

export default Profiles
