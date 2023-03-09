import React, { useRef, useState, useEffect } from 'react';
import {FaBars} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {FaUser, FaTachometerAlt, FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import img from '../images/MyPicture1.jpg'
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [sideNav, setsideNav] = useState('flex')
  const [loader, setloader] = useState('loader')
  const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110');
  const navigate = useNavigate();

  const handleSideNav = (e) =>{
        e.preventDefault();
    if(sideNav === 'hidden'){
      setsideNav('flex transition ease-linear transition duration-700')
    }
    else{
      setsideNav('hidden')
      
    }
  }
  useEffect(() => {
  setsideNav('hidden')
  setloader('text')
  

}, []);
    // Handle Log out Function
    const handleLogOut = (e) =>{
        e.preventDefault();
      const auth = getAuth();
     signOut(auth).then(() => {
        if(window.confirm(`Are you sure you want to log out?`)){
                  window.alert("Logged Out Successfully");
                  localStorage.removeItem("currentUserEmail");
                  navigate('/login');
          }
          else{
                  window.alert("Log Out Cancelled");
                  setsideNav('hidden')
          }
    }).catch((error) => {
  window.alert("Sorry Due to some internal error you are unable to log out")
  });
    }
    return (
            <> 
    <div className={loader}></div>
    <div className=" bg-white dark:bg-slate-900  dark:text-white h-screen w-full  overflow-hidden">
    <div className='w-full  overflow-hidden'>
    <div className="text bg-slate-100 shadow-inner drop-shadow-lg dark:bg-slate-700 md:w-2/3 lg:w-1/2 h-full overflow-hidden w-full absolute md:right-10 md:h-4/5 lg:left-1/3 md:mx-auto px-5 md:px-20 py-16 md:mt-28">
                <Link className='text md:hidden'>
                          <FaBars className='absolute right-10 top-6 text-3xl' onClick={handleSideNav}/>
                  </Link>
          <div className="text w-full h-full bg-white dark:bg-slate-900 overflow-auto py-10 md:py-10 px-5">
            <img src={img} alt="" className="text w-32 h-40 hidden md:flex absolute right-24 top-16" />
              <div className="text md:w-2/3  h-full">
                  <span className="text-blue-500">Health comes first...</span>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-gray-500 mt-5  dark:text-white">The Number One Medical Management System In 
                  <span className="text-blue-500"> Nigeria</span>.
                  </h1>
               <img src={img} alt="" className="text w-32 h-32 float-right mt-16 rounded-lg md:hidden ml-4" />
                  <p className="mt-10 md:text-xl">
                              Welcome to <span className="  font-mono font-bold">WastroMedics, </span><br /> 
                              a leading health centre, offering a range of medical services like <span className="">Chiropractic, Physical Therrapy, Dentist </span>and <span className="">Eye Exam.</span>
                        </p>
                        <p className=" md:text-xl mt-4">We specialising  in solving  with different issues and our ability to provide medical services in over 20 languages, we are sure you will find the right doctor to help you. We work with individuals, couples and families, supporting adults, children and adolescents.</p>
                        <p className=" text-xl mt-4 mb-10 font-bold">Thank You!</p>
              </div>
            {/* <span className="text font-bold text-xl absolute top-40 hidden right-40 md:flex">C.E.O</span> */}
            {/* <span className="text font-bold text-xl absolute md:top-2/3 md:right-32 top-80 z-30 translate-y-14 right-16 md:translate-y-8 dark:text-white">A.O. Emmanuel</span> */}
            <div className="text w-80 h-96 hidden sticky drop-shadow-lg rounded-xl  z-10  bg-white  overflow-hidden">
          </div>
        </div>
    </div>
    </div>
</div>
{/* Nav Bar for Options and smaller screen mobiles */}
<div className={sideNav}>
                    <div className="text-white w-72 h-full bg-slate-400 dark:bg-slate-800 dark:text-white text-lg dark:border-r-gray-500 absolute right-0 top-16 md:hidden">
                    <h1 className="z-auto text-center mt-10 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-red-400 to-blue-600 font-mono">WastroMedics</h1>
                    <div className="w-full">
                              <ul className="text mx-auto  border-b border-b-gray-500  pb-10 w-4/5 lg:mx-auto">
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
                              <ul className="text mt-10  w-4/5 mx-auto">
                                  <NavLink to='/contacts' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                          <FaPhoneAlt className="text-sm mr-3 my-7 "/>
                                          <li className=" border-gray-400 text-sm my-6">CONTACTS</li>
                                  </NavLink>
                                  {/* <NavLink to='/faq' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                          <FaUser className="text-sm mr-3 my-8 "/>
                                          <li className="border-gray-400 text-sm my-6">FAQ</li>
                                  </NavLink> */}
                                  <NavLink exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                          <FaSignOutAlt className="text-sm mr-3 my-8  text-red-700 ml-4"/>
                                          <li className="border-gray-400 text-sm my-6 text-red-700" onClick={handleLogOut}>LOGOUT</li>
                                  </NavLink>
                              </ul>
                        </div>
                    </div>
                </div>
                     
  </>
  )
}

export default Schedule
