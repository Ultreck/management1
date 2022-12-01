import React, { useState, useEffect } from 'react';
import img from '../images/zz4.jpg'
import { initializeApp } from 'firebase/app';
import {  getStorage, ref,  getDownloadURL, uploadBytesResumable  } from 'firebase/storage';
import {FaBars, FaPen, FaCamera} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {FaUser, FaTachometerAlt, FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { getDocs, collection, getFirestore } from 'firebase/firestore/lite';

const Profilecomp = ({setprofilePics}) => {

  const navigate = useNavigate();
  // UesState for the current users logged in
  const [profileData, setprofileData] = useState({})
  const [email, setemail] = useState(JSON.parse(localStorage.getItem("currentUserEmail")))
  // console.log(profileData);
  let firstName = profileData.firstname;
  let surnName = profileData.surname;


  const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110')

  // FireBase DataBase configurations
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
   const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const db = getFirestore(app);

    // Use States Hooks
  const [bioClass, setbioClass] = useState("hidden");
  const [picsClass, setpicsClass] = useState("hidden");
  const [profileUpload, setprofileUpload] = useState(null)
  const [sideNav, setsideNav] = useState('flex')
  const [optionBar, setoptionBar] = useState('flex')
  const [userProfileData, setuserProfileData] = useState('text absolute w-5/6 top-80 mt-10 mx-10 pr-5')
  const [progress, setprogress] = useState(null)
  const [widePicsView, setwidePicsView] = useState('hidden')
  const [cancleX, setcancleX] = useState("text-red-500 font-bold absolute right-8 top-8 text-3xl cursor-pointer flex")
  const [okPics, setokPics] = useState('hidden text-blue-500 font-bold absolute right-8 top-8 text-3xl cursor-pointer ')
  const [okButtin, setokButtin] = useState('hidden text font-bold text-2xl z-20  absolute top-32 left-60')
  const [progressDis, setprogressDis] = useState("text font-bold text-2xl z-20  absolute top-32 left-60 hidden")
  const [downloadUrl, setdownloadUrl] = useState(null)
  const [bioText, setbioText] = useState(JSON.parse(localStorage.getItem("BioUpdate")));
  const [cardNo, setcardNo] = useState('flex');
  const [specializatoin, setspecializatoin] = useState('flex');
  const [loader, setloader] = useState('loader')
  // setprofilePics(downloadUrl);


  //  UseEffect for all needed comps
  useEffect(() => {
    getDrData();
    getPtData();
    setsideNav('hidden');
    // Updating Image into user profile
    const downloadUrl = ref(storage, `profilePics/${email}`);
    getDownloadURL(downloadUrl).then((url) => {
      if(url){
        setdownloadUrl(url);
      }
      else{
        return;
      }
    });

    setloader('text');
   
  }, [])

      //     console.log(email);
      const getDrData = async() => {
        const querySnapshot = await getDocs(collection(db, "doctorsData"));
        let userEmail =JSON.parse(localStorage.getItem("currentUserEmail")) ;
        querySnapshot.forEach((doc, indx) => {
              if(doc.data().email === userEmail){
                    setemail(doc.data().email)
                    setprofileData(doc.data());
                    setloader('text')
                  }
                });
              }
              const getPtData = async() => {
        const querySnapshot = await getDocs(collection(db, "patientsData"));
        let userEmail =JSON.parse(localStorage.getItem("currentUserEmail")) ;
        querySnapshot.forEach((doc, indx) => {
          if(doc.data().email === userEmail){
            setprofileData(doc.data());
            setemail(userEmail)
            setloader('text')
                    
              }
            
        });
      }



  // Functions that Upload profile picture and also set Profile pictures
  const handleProfilePics = () =>{
    setpicsClass("flex");
    setoptionBar('hidden');
    setuserProfileData('hidden');
  }
  const handleCancelPic = () => {
    const downloadUrl = ref(storage, `profilePics/${email}`);
    getDownloadURL(downloadUrl).then((url) => {
      setdownloadUrl(url);
    });
    setpicsClass("hidden");
    setoptionBar('flex');
    setuserProfileData('text absolute w-5/6 top-80 mt-10 mx-10 pr-5');
  }
  const handleSaveProfilePics = () => {
    if(profileUpload === null) return;
    const imageRef = ref(storage, `profilePics/${email}`);
    setprogressDis("text font-bold text-2xl z-20  absolute top-32 left-48 md:left-72 flex")
    const uploadTask = uploadBytesResumable(imageRef, profileUpload);
    uploadTask.on('state_changed', (snapshot) => {
      const progrreess = Math.round((snapshot.bytesTransferred/ snapshot.totalBytes) * 100);
      setprogress(progrreess)
      getDownloadURL(snapshot.ref).then((url) => {
        setdownloadUrl(url);
        if(progrreess === 100){
          setokButtin("text font-bold text-2xl z-20  absolute top-32 left-28  md:left-60 flex")
          setprogressDis("hidden");
          setokPics("flex text-blue-500 font-bold absolute right-8 top-8 text-3xl cursor-pointer ");
          setcancleX("hidden ");
        }
      });
    })
  }



  // Function that work for OK button after the Image has uploaded successfully
   const handleOk = () =>{
    const downloadUrl = ref(storage, `profilePics/${email}`);
    getDownloadURL(downloadUrl).then((url) => {
      setdownloadUrl(url);
    });
    setpicsClass("hidden");
    setokButtin("hidden");
    setoptionBar('flex');
    setuserProfileData('text absolute w-5/6 top-80 mt-10 mx-10 pr-5');
   }



  //  Function showing the wide view of the user profile picture
   const handleWideView  = () => {
    setwidePicsView('flex');
    setoptionBar('hidden');
    setuserProfileData('hidden');
  }
  const handlecancleWideView = () => {
    setwidePicsView("hidden");
    setoptionBar('flex');
    setuserProfileData('text absolute w-5/6 top-80 mt-10 mx-10 pr-5');
   }
  



   // Funtion for side bar/nav in smaller screen
   const handleSideNav = () =>{
    if(sideNav === 'hidden'){
      setsideNav('flex transition ease-linear transition duration-700')
    }
    else{
      setsideNav('hidden')

    }
   }



  // function to set or edit bio
  const handlebio = () => {
    setbioClass("flex");
    setoptionBar('hidden');
    setuserProfileData('hidden');
  }
  const handleCancel = () => {
    setbioClass("hidden");
    setoptionBar('flex');
    setuserProfileData('text absolute w-5/6 top-80 mt-10 mx-10 pr-5');
  }
  const handleSaveBio = () => {
    localStorage.setItem("BioUpdate", JSON.stringify(bioText))
    setbioText(JSON.parse(localStorage.getItem("BioUpdate")))
    setbioClass("hidden");
    setoptionBar('flex');
    setuserProfileData('text absolute w-5/6 top-80 mt-10 mx-10 pr-5');
  };

  // Handle Log out Function
  const handleLogOut = () =>{
    const auth = getAuth();
   signOut(auth).then(() => {
      if(window.confirm(`${profileData.surname}!  Are you sure you want to log out?`)){
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
    <div>
       <div className={loader}></div>
       <div className=' bg-gray-100 lg:ml-96 w-full  md:w-4/5  md:h-screen dark:bg-slate-900  dark:text-white text-lg'>
                 <div className="text w-full md:mx-60 lg:mx-96 md:w-3/5  mx-auto 
                lg:w-2/5 border h-screen bg-gray-50 dark:bg-slate-800 dark:text-white  border-t-0 fixed ">
                      <div className="text md:w-3/5 lg:w-2/5 w-full h-60  bg-slate-400 dark:bg-slate-900 px-10 fixed">
                        <div className={optionBar}>
                          <Link className='text md:hidden'>
                                <FaBars className='absolute right-10 top-16 text-3xl text-white' onClick={handleSideNav}/>
                          </Link>
                        </div>
                      </div>
                      {/* User profile picture */}
                      <div className="text w-36 h-36 bg-slate-200 border rounded-full z-10 fixed translate-y-40 translate-x-5 p-1 dark:bg-slate-800" onDoubleClick={handleWideView}  onTouchStart={handleWideView}>
                        {!downloadUrl? 
                        <img src={img} alt="" className='h-full w-full rounded-full' />:
                        <img src={downloadUrl} alt=" " className='h-full w-full rounded-full' />
                      }
                      </div>
                      <FaCamera className=' z-20  text-black absolute dark:text-white top-56 left-52 -translate-x-14 cursor-pointer text-xl' title='Upload Profile' onClick={handleProfilePics}></FaCamera>
                      {/* Picture pop up container */}
                      <div className={picsClass}>
                          <div className="text w-4/5 translate-x-14 lg:translate-x-20 dark:bg-slate-700 h-1/2  bg-gray-100 mt-36 absolute shadow-inner shadow-white drop-shadow-2xl justify-center items-center z-50 lg:p-28 p-16">
                          <span className={progressDis}>{progress} %</span>
                          <span className={okButtin}>Image Uploaded...</span>
                          <button onClick={handleOk} className={okPics} >Ok</button>
                              <input type="file" className="text w-full mt-28 rounded-full py-1 px-6"  onChange={(e) =>setprofileUpload(e.target.files[0])}/>
                              <button onClick={handleSaveProfilePics} className="text-center w-1/2 bg-blue-400 hover:bg-blue-600 ease-in-out delay-75 hover:text-white my-6 font-bold text-xl py-1 rounded-full lg:translate-x-32 translate-x-16">Upload</button>
                              <span className={cancleX} title='Cancel' onClick={handleCancelPic}>X</span>
                          </div>
                      </div>

                      {/* Landscape show of the user picture */}
                      <div className={widePicsView}>
                          <div className="text w-full dark:bg-slate-700 h-2/3  bg-gray-100 mt-36 absolute shadow-inner shadow-white drop-shadow-2xl justify-center items-center z-50">
                                <img src={downloadUrl} alt="" className="text w-full h-full" />
                              <span className={cancleX} title='Cancel' onClick={handlecancleWideView} >X</span>
                          </div>
                      </div>
                      {/* User Profile display fields */}
                      <div className={userProfileData}>
                          <div className="text">
                                <div className="text w-full border-b">
                                    <span className="text font-bold">Name:</span>
                                    <span className="text pl-7">{surnName}</span>
                                    <span className="text pl-7">{firstName}</span>
                                  </div>
                                <div className="text w-full border-b my-16">
                                    <span className="text font-bold">Email:</span>
                                    <span className="text pl-7">{profileData.email}</span>
                                  </div>
                                <div className="text w-full border-b my-16">
                                    <span className="text font-bold">Contact:</span>
                                    <span className="text pl-7">{profileData.contact}</span>
                                </div>
                                <div className={cardNo}>
                                </div>
                                <div className={specializatoin}>
                                      {
                                      profileData.fieldOfSpecialization?
                                      <div className="text w-full border-b">
                                          <span className="text font-bold">Profession:</span>
                                          <span className="text pl-7">{profileData.fieldOfSpecialization}</span>
                                      </div>:
                                    <div className="text w-full border-b ">
                                        <span className="text font-bold">Cald No:</span>
                                        <span className="text pl-7">{profileData.cardNo}</span>
                                    </div>
                                      }
                                </div>
                                <div className="text w-full border-b my-20">
                                    <span className="text font-bold">Bio:</span>
                                    <span className="text pl-7">{bioText}</span>
                                    <FaPen title='Edit Bio' className="text-white rounded-full  absolute right-0 -translate-y-8 cursor-pointer bg-blue-600 w-16 h-6 p-1" onClick={handlebio}></FaPen>
                                </div>
                          </div>
                      </div>

                      {/* Bio pop up container */}
                      <div className={bioClass}>
                          <div className="text w-4/5 translate-x-16 lg:translate-x-20 dark:bg-slate-700 h-1/2  bg-gray-200 mt-36 absolute shadow-inner shadow-white drop-shadow-2xl justify-center items-center z-50 lg:p-28 p-16">
                              <input type="text" className="text dark:text-black w-full mt-28 rounded-full py-1 px-6" placeholder='Update Bio...' onChange={(e) =>setbioText(e.target.value)}/>
                              <button onClick={handleSaveBio} className="text-center w-1/2 bg-blue-400 hover:bg-blue-600 hover:text-white my-6 font-bold text-xl py-1 rounded-full lg:translate-x-32 translate-x-16">Save</button>
                              <span className="text-red-500 font-bold absolute right-8 top-8 text-3xl cursor-pointer" title='Close' onClick={handleCancel}>X</span>
                          </div>
                      </div>

                      {/* Nav Bar for Options and smaller screen mobiles */}
                      <div className={sideNav}>
                          <div className="text-white w-72 h-full bg-slate-400 dark:bg-slate-900 dark:text-white text-lg dark:border-r-gray-500 absolute right-0 top-28 md:hidden dark:border-t-2 z-40">
                          <h1 className="z-auto text-center mt-10 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-red-400 to-blue-600 font-mono">WastroMedics</h1>
                          <div className="w-full">
                                    <ul className="text mx-auto  border-b border-b-gray-500  pb-10 w-4/5 lg:mx-auto">
                                        <NavLink to='/dashboard' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaTachometerAlt className="text-lg mr-3  my-8"/>
                                                <li className=" border-gray-400 text-lg my-6 ">DASHBOARD</li>
                                          </NavLink>
                                        <NavLink to='/profiles' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUserCircle className="text-lg mr-3 my-7 "/>
                                                <li className="border-gray-400 text-lg my-6">PROFILE</li>
                                        </NavLink>
                                        <NavLink to='/doctors' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUserNurse className="text-lg mr-3 my-7 "/>
                                                <li className="border-gray-400 text-lg my-6">DOCTORS</li>
                                        </NavLink>
                                        <NavLink to='/schedules' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaCalendar className="text-lg mr-3 my-7 "/>
                                                <li className=" border-gray-400 text-lg my-6">ABOUT</li>
                                        </NavLink>
                                    </ul>
                                    <ul className="text mt-10  w-4/5 mx-auto">
                                        <NavLink to='/contacts' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaPhoneAlt className="text-lg mr-3 my-7 "/>
                                                <li className=" border-gray-400 text-lg my-6">CONTACTS</li>
                                        </NavLink>
                                        {/* <NavLink to='/faq' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUser className="text-lg mr-3 my-8 "/>
                                                <li className="border-gray-400 text-lg my-6">FAQ</li>
                                        </NavLink> */}
                                        <NavLink exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaSignOutAlt className="text-lg mr-3 my-8  text-red-700 ml-4"/>
                                                <li className="border-gray-400 text-lg my-6 text-red-700" onClick={handleLogOut}>LOGOUT</li>
                                        </NavLink>
                                    </ul>
                              </div>
                          </div>
                      </div>
                     
                 </div>

            </div>
    </div>
  )
}

export default Profilecomp