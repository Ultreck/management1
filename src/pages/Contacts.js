import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {FaUser, FaTachometerAlt, FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaLinkedin, 
FaYoutube, FaDownload, FaRegCopyright, FaBars} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import SideNavTemp from '../components/SideNavTemp';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const Contacts = () => {
  const [sideNav, setsideNav] = useState('flex')
  const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110');
  const [loader, setloader] = useState('loader')
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
  

}, [])

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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessagel] = useState('');

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        'service_26pqjht', 
        'template_twlglg9', 
        form.current, '5gnyed-zn_Ooi6BAJ')
      .then((result) => {
        alert(result.text);
        setFirstName('');
        setLastName('');
        setMessagel('');
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
     <div className={loader}></div>
    <div className="text">
        <SideNavTemp/>
    </div>
    <div className=" bg-white dark:bg-slate-900 dark:text-white h-screen w-full">
          <div className='w-full'>
          <div className="text bg-slate-100 shadow-inner drop-shadow-lg dark:bg-slate-800 md:w-1/2 w-full absolute h-screen md:left-1/3 md:mx-auto px-10 md:px-20 py-20">
                      <Link className='text md:hidden'>
                                <FaBars className='absolute right-10 top-8 text-3xl' onClick={handleSideNav}/>
                          </Link>
                <h1 className=" mb-8 text-center font-mono font-semibold text-2xl">Chat me up </h1>
                <ul className="">
                      <li className="">
                            <a href="https://www.facebook.com/emmanuel.oluwatayese" className="my-5 flex gap-3 md:text-xl md:my-7 hover:bg-slate-200 w-40 px-5 dark:text-white dark:hover:bg-slate-500 hover:scale-110">
                                        <FaFacebook className="mt-1"/>
                                        <span className="">Facebook</span>
                            </a>
                      </li>
                      <li className="">
                            <a href="https://wa.me/qr/6VF2TF3N3PN7G1" className="my-5 flex gap-3 md:text-xl md:my-7 hover:bg-slate-200 w-40 px-5 dark:text-white dark:hover:bg-slate-500 hover:scale-110">
                                        <FaWhatsapp className="mt-1"/>
                                        <span className="">Whatsapp</span>
                            </a>
                      </li>
                      <li className="">
                            <a href="https://twitter.com/Ultreck1?s=09" className="my-5 flex gap-3 md:text-xl md:my-7 hover:bg-slate-200 w-40 px-5 dark:text-white dark:hover:bg-slate-500 hover:scale-110">
                                  <FaTwitter className="mt-1"/>
                                  <span className="">Twitter</span>
                            </a>
                      </li>
                      <li className="">
                            <a href="https://www.instagram.com/emmanuel_oluwatayese?r=nametag" className="my-5 flex gap-3 md:text-xl md:my-7 hover:bg-slate-200 w-40 px-5 dark:text-white dark:hover:bg-slate-500 hover:scale-110">
                                  <FaInstagram className="mt-1"/>
                                  <span className="">Instagram</span>
                            </a>
                      </li>
                      <li className="">
                            <a href="https://www.linkedin.com/in/a-emmanuel-oluwatayese-39254b218" className="my-5 flex gap-3 md:text-xl md:my-7 hover:bg-slate-200 w-40 px-5 dark:text-white dark:hover:bg-slate-500 hover:scale-110">
                                  <FaLinkedin className="mt-1"/>
                                  <span className="">Linkedin</span>
                            </a>
                      </li>
                      <li className="">
                            <a href="https://youtube.com/channel/UCO1CNgEARCnuodUuy9JVaAw" className="my-5 flex gap-3 md:text-xl md:my-7 hover:bg-slate-200 w-40 px-5 dark:text-white dark:hover:bg-slate-500 hover:scale-110">
                                  <FaYoutube className="mt-1"/>
                                  <span className=" ">Youtube</span>
                            </a>
                      </li>
                </ul>
                <div className=" text-center">
                      <h1 className="text-xl font-semibold mb-4 md:text-2xl">Enquiries/Question</h1>
                      <p className="text w-full mx-auto md:text-xl">Now that you know a lot about us, let us know if you have any enquiries or request.</p>
                      <form className=" mt-4" ref={form} onSubmit={sendEmail}>
                            <div className="text ">
                                  <div className="text flex w-full">
                                              <input type="text" 
                                              className="text py-2 w-1/2 mx-1 pl-4 dark:text-black dark:bg-slate-300"  
                                              placeholder='name'  name="user_name"
                                              value={firstName}
                                              onChange={e => setFirstName(e.target.value)}/>
                                              <input type="text" 
                                              className="text py-2 w-1/2 mx-1 pl-4 dark:text-black dark:bg-slate-300" 
                                              placeholder='email' 
                                              name="user_email"
                                              value={lastName}
                                              onChange={e => setLastName(e.target.value)}/>
                                  </div>
                                  <div className="text ">
                                        <textarea textarea name="message"  
                                        id="textarea" rows="5"
                                        className="text mt-6 w-full  pl-4 dark:text-black dark:bg-slate-300"  
                                        placeholder='Message'
                                        value={message}
                                        onChange={e => setMessagel(e.target.value)}></textarea>
                                              <label htmlFor="" className="text ms-3 col-3 fst-italic "></label>
                                  </div>
                            </div>
                      <div className="text-end col-11 mx-auto mt-4 subm">
                            <button type='submit' className="text bg-blue-500 hover:bg-blue-800 px-8 md:w-1/3 py-2 text-white font-mono font-semibold">Get In Touch</button>
                      </div>
                      </form>
                </div>
          </div>
          </div>
    </div>
     {/* Nav Bar for Options and smaller screen mobiles */}
     <div className={sideNav}>
                          <div className="text-white w-72 h-full bg-slate-400 dark:bg-slate-900 dark:text-white text-lg dark:border-r-gray-500 absolute right-0 top-16 md:hidden">
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

export default Contacts
