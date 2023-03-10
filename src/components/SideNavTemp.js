import React, { useState, useEffect } from 'react';
import {FaUser, FaTachometerAlt, FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt} from 'react-icons/fa'
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const SideNavTemp = ({profileData}) => {

        const navigate = useNavigate();
        const handleLogOut = (e) =>{
                e.preventDefault();
                const auth = getAuth();
               signOut(auth).then(() => {
                if(window.confirm(` Are you sure you want to log out?`)){
                        window.alert("Logged Out Successfully");
                        localStorage.removeItem("currentUserEmail");
                        navigate('/login');
                }
                else{
                        window.alert("Log Out Cancelled");
                }
              }).catch((error) => {
            window.alert("Sorry Due to some internal error you are unable to log out")
        });
              }
      const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110')
  return (
    <>
             <div className="bg-gray-50 fixed lg:w-1/6   h-screen md:flex dark:border-r border-r-2 hidden z-10 dark:bg-slate-800 dark:text-white text-lg dark:border-r-gray-500 pt-16 ">
                              <div className="w-full">
                                    <ul className="text  border-b border-b-gray-500 pl-24 pb-10 w-4/5 lg:mx-auto">
                                        <NavLink to='/dashboard' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaTachometerAlt className="text-sm mr-3  my-8"/>
                                                <li className=" border-gray-400 text-sm my-6 ">DASHBOARD</li>
                                          </NavLink>
                                        <NavLink to='/profiles' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUserCircle className="text-sm mr-3 my-7 "/>
                                                <li className="border-gray-400 text-sm my-6">PROFILE</li>
                                        </NavLink>
                                        <NavLink to='/doctors' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUserNurse className="text-sm mr-3 my-7 "/>
                                                <li className="border-gray-400 text-sm my-6">DOCTORS</li>
                                        </NavLink>
                                        <NavLink to='/schedules' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaCalendar className="text-sm mr-3 my-7 "/>
                                                <li className=" border-gray-400 text-sm my-6">ABOUT</li>
                                        </NavLink>
                                    </ul>
                                    <ul className="text mt-10  pl-20  w-4/5 mx-auto">
                                        <NavLink to='/contacts' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaPhoneAlt className="text-sm mr-3 my-7 "/>
                                                <li className=" border-gray-400 text-sm my-6">CONTACTS</li>
                                        </NavLink>
                                        {/* <NavLink to='/faq' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUser className="text-sm mr-3 my-8 "/>
                                                <li className="border-gray-400 text-sm my-6">FAQ</li>
                                        </NavLink> */}
                                        <NavLink exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaSignOutAlt className="text-sm mr-3 my-8  text-red-700 "/>
                                                <li className="border-gray-400 text-sm my-6  text-red-700" onClick={handleLogOut}>LOGOUT</li>
                                        </NavLink>
                                    </ul>
                              </div>
                        </div>
    </>
  )
}

export default SideNavTemp
