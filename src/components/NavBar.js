import React, { useState } from 'react';
import {FaSearch, FaBars, FaBell} from 'react-icons/fa';
import img from '../images/zz4.jpg'




const NavBar = ({profilePics, handleChanges, query}) => {
  const [sideNav, setsideNav] = useState("hidden")
    // Funtion for side bar/nav in smaller screen


   const handleSideNav = (e) =>{
    e.preventDefault();
      if(sideNav === 'hidden'){
        setsideNav('flex transition ease-linear transition duration-700')
      }
      else{
        setsideNav('hidden')
  
      }
     }
  return (
    <>
      <div className="text fixed w-full z-50">
            <header className="text bg-gray-50 border-b h-20 md:px-16 py-5 dark:bg-slate-900 dark:border-b-gray-500 px-8 w-full ">
                  <nav className='text flex'>
                        <div className="tex flex md:w-3/4 ">
                              <h1 className='lg:ml-20   text-2xl text-blue-800 dark:text-white font-mono font-extrabold '>WastroMedics</h1>
                              <input type="search" name='search'
                               value={query}
                                onChange={handleChanges} 
                               className="text-black ml-4 -translate-y-1 hidden md:flex lg:ml-32 lg:w-1/2 md:w-2/3 px-8 rounded bg-slate-200 md:ml-20 dark:bg-gray-300  focus:outline-dashed" placeholder='Search Dorctors by their first name...'/>
                              <FaSearch className='md:-translate-x-8 hidden md:flex relative text-xl  mt-3 md:mt-3 dark:text-white'/>
                              <FaBars className='md:hidden absolute right-12  mt-1 text-xl dark:text-white' onClick={handleSideNav}/>
                        </div>
                          
                        <div className="text  w-1/4 hidden md:flex dark:text-gray-300">
                             <div className="text border-r-2 sm:border-r-0 border-r-gray-400 h-12 w-3/5">
                                    <a href="##" className="text">
                                          <FaBell className='hidden md:flex absolute right-72 md:right-40  mt-3 text-2xl '/>
                                    </a>
                             </div>
                             <div className="hidden object-fill md:flex absolute right-40 md:right-16 w-14 h-14 bg-gray-200 rounded-full -translate-y-2 border border-gray-500 dark:bg-gray-500">
                             {!profilePics? 
                        <img src={img} alt="" className='h-full w-full rounded-full' />:
                        <img src={profilePics} alt=" " className='h-full w-full rounded-full' />
                      }
                             </div>
                        </div>
                        
                  </nav>
            </header>
      </div>
    </>
  )
}

export default NavBar