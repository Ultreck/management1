import React, { useState } from 'react';
import { FaTachometerAlt, FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import {NavLink} from 'react-router-dom';

const SideNav = ({profileData}) => {
      const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110');

      const navigate = useNavigate();
      const firebaseConfig = {
        apiKey: "AIzaSyDqZ4KezaoQFeqq-yKLKU8x0zmMe0dBEy0",
        authDomain: "management-system-ef1c9.firebaseapp.com",
        databaseURL: "https://management-system-ef1c9-default-rtdb.firebaseio.com",
        projectId: "management-system-ef1c9",
        storageBucket: "management-system-ef1c9.appspot.com",
        messagingSenderId: "180990896672",
        appId: "1:180990896672:web:6fc38d2453437ea59dea45",
        measurementId: "G-6BCMWNT7PV"
      };
  //     Firebase initialization and assigning variable
//       const app = initializeApp(firebaseConfig);
    
      const handleLogOut = (e) =>{
        e.preventDefault();
        const auth = getAuth();
       signOut(auth).then(() => {
        if(window.confirm(`${profileData.surname || profileData.lastname}!  Are you sure you want to log out?`)){
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
  return (
    <>
             <div className="bg-gray-50 fixed mt-20 w-1/5 h-screen md:flex dark:border-r border-r-2 hidden dark:bg-slate-800 dark:text-white text-sm dark:border-r-gray-500 pt-16  ">
                              <div className="w-full">
                                    <ul className="text  border-b border-b-gray-500 pl-24 pb-10 w-4/5 lg:mx-auto ">
                                        <NavLink to='/dashboard' className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaTachometerAlt className="text-sm mr-3  my-8"/>
                                                <li className=" border-gray-400 text-sm my-6 "  exact activeclassName={active} >DASHBOARD</li>
                                          </NavLink>
                                        <NavLink to='/profiles' exact activeclassName={active} className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUserCircle className="text-sm mr-3 my-7 "/>
                                                <li className="border-gray-400 text-sm my-6">PROFILE</li>
                                        </NavLink>
                                        <NavLink to='/doctors' exact activeclassName={active} className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUserNurse className="text-sm mr-3 my-7 "/>
                                                <li className="border-gray-400 text-sm my-6">DOCTORS</li>
                                        </NavLink>
                                        <NavLink to='/schedules' exact activeclassName={active} className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaCalendar className="text-sm mr-3 my-7 "/>
                                                <li className=" border-gray-400 text-sm my-6">ABOUT</li>
                                        </NavLink>
                                    </ul>
                                    <ul className="text mt-10  pl-24  w-4/5 mx-auto">
                                        <NavLink to='/contacts' exact activeclassName={active} className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaPhoneAlt className="text-sm mr-3 my-7 "/>
                                                <li className=" border-gray-400 text-sm my-6">CONTACTS</li>
                                        </NavLink>
                                        {/* <NavLink to='/faq' exact activeclassName={active} className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUser className="text-lg mr-3 my-8 "/>
                                                <li className="border-gray-400 text-lg my-6">FAQ</li>
                                        </NavLink> */}
                                        <NavLink exact activeclassName={active} className={'flex hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaSignOutAlt className="text-sm mr-3 my-8  text-red-700 ml-4"/>
                                                <li className="border-gray-400 text-sm my-6  text-red-700" onClick={handleLogOut}>LOGOUT</li>
                                        </NavLink>
                                    </ul>
                              </div>
                        </div>
    </>
  )
}

export default SideNav