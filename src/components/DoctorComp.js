import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import img from '../images/zz4.jpg'
import { getDatabase } from "firebase/database";
import {useForm} from 'react-hook-form';
import { getDocs, collection, getFirestore } from 'firebase/firestore/lite';
import {  getStorage, ref,  getDownloadURL, uploadBytesResumable  } from 'firebase/storage';
import {FaUser, FaTachometerAlt, FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt, FaArrowLeft, FaBars} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import {NavLink} from 'react-router-dom';

const DoctorComp = ({profileDataMast}) => {
      const navigate = useNavigate();
      // Firebase configuration and set up 
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
          
      // Firebase initialization and assigning
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const storage = getStorage(app);
      const database = getDatabase(app);


      // UseState Section
      const [userArr, setuserArr] = useState([]);
      // console.log(userArr);
      const [profilePics, setprofilePics] = useState();
      const [index, setindex] = useState(1);
      const [doctCont, setdoctCont] = useState("text grid");
      const [marque, setmarque] = useState("hidden");
      const [localStorageEm, setlocalStorageEm] = useState();
      const [userProfileData1, setuserProfileData1] = useState('hidden');
      const [userProfileData2, setuserProfileData2] = useState('hidden');
      const [clickedUsers, setclickedUsers] = useState({});
      const [clickedUserEm, setclickedUserEm] = useState();
      const [clickedUserSur, setclickedUserSur] = useState();
      const [email, setemail] = useState();
      const [status, setstatus] = useState('Available');
      const [sideNav, setsideNav] = useState();
      const [tableRowClass, settableRowClass] = useState("text bg-gray-50  overflow-auto h-screen w-full lg:w-3/5 md:mx-auto  md:ml-72 dark:bg-slate-900  dark:text-white shadow-inner shadow-gray-300  px-10 ");
      const [clickedUserFir, setclickedUserFir] = useState();
      const [clickedUserCon, setclickedUserCon] = useState();
      const [clickedUserPro, setclickedUserPro] = useState();
      const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110')
      const [loader, setloader] = useState('loader')


      // UseEffect Hook
      useEffect(() => {
            getDrData();
            const downloadUrl = ref(storage, `profilePics/${email}`);
            getDownloadURL(downloadUrl).then((url) => {
                  setprofilePics(url);
            });
            // console.log(userArr);
            handleDocProfile();
            setloader('text')
            setsideNav('hidden')
            setlocalStorageEm(JSON.parse(localStorage.getItem('currentUserEmail')))
      }, [clickedUserEm])
      
      // Function for back to home in median screen
      const handleBackArr = () => {
            setuserProfileData1('hidden');
            setuserProfileData2('hidden');
            settableRowClass("text bg-gray-50  overflow-auto h-screen w-full lg:w-3/5 md:mx-auto  md:ml-72 dark:bg-slate-700  dark:text-white shadow-inner shadow-gray-300  px-10");
            
      }
         
      // Get doctor's data function
      const getDrData = async() => {
      const querySnapshot = await getDocs(collection(db, "doctorsData"));
            setuserArr(querySnapshot._docs);
            querySnapshot.forEach((doc, indx) => {
                  setemail(doc.data().email);
                  setloader('text')
            });
      }

      // The Main function for doctor's  profile
      const handleDocProfile = async() =>{
        setclickedUserSur(clickedUsers.surname.stringValue)
         setclickedUserEm(clickedUsers.email.stringValue);
         setemail(clickedUsers.email.stringValue);
         setclickedUserFir(clickedUsers.firstname.stringValue);
         setclickedUserCon(clickedUsers.contact.stringValue);
         setclickedUserPro(clickedUsers.fieldOfSpecialization.stringValue);
         setuserProfileData2('flex');
         setuserProfileData1(' flex')
         settableRowClass("text bg-gray-50  overflow-auto h-screen w-full lg:w-3/5 md:mx-auto  md:ml-6 dark:bg-slate-700  dark:text-white shadow-inner shadow-gray-300  px-10")
         getMatchPics();

      //    Conditional Statement to know whether the current user clicked on his/her own profile
         if(localStorageEm === clickedUserEm){
            setdoctCont('hidden')
            setmarque('grid')
      }
      else{
               setdoctCont('text grid');
               setmarque('hidden');

         }
         
      }

      // Function that match the doctor's picture to his profile
      const getMatchPics = async() =>{
            // console.log(email);
            setemail(clickedUsers.email.stringValue);
            const downloadUrl = ref(storage, `profilePics/${email}`);
            getDownloadURL(downloadUrl).then((url) => {
                  setprofilePics(url);
            });
      }
      
      // Handle Schedule function for the patient
      const handleSchedule = () =>{
            setuserProfileData2('hidden');
            setuserProfileData1('hidden');
            settableRowClass("text bg-gray-50  overflow-auto h-screen w-full lg:w-3/5 md:mx-auto  md:ml-72 dark:bg-slate-700  dark:text-white shadow-inner shadow-gray-300  px-10");
            console.log(clickedUsers);
            console.log(profileDataMast);
      }
      


      // Function that handle Optional bar sidenav
      const handleSideNav = () =>{
            if(sideNav === 'hidden'){
              setsideNav('flex transition ease-linear transition duration-700')
            }
            else{
              setsideNav('hidden')
        
            }
           }

      //      Handle Log out Function
           const handleLogOut = () =>{
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
    <section className="text md:right-10 w-full  lg:w-10/12 flex fixed lg:gap-2 dark:bg-slate-900 ">
      <div className={tableRowClass}>
            <div className="text bg-slate-100 dark:bg-slate-800 h-40 px-20  shadow-inner -translate-x-1 md:-translate-x-10  shadow-gray-300 fixed md:w-2/3   lg:w-1/2">
                  <h1 className="text-3xl flex  text-center my-6 font-mono font-bold px-3">
                        <span className="text ml-2">Doctors</span>
                        </h1>
                  <FaBars className='md:hidden absolute right-8 top-7 mt-1 text-2xl dark:text-white' onClick={handleSideNav}/>
                  {/* <h1 className="text-md  text-center mt-10">Click each row to see full details</h1> */}
            </div>
            {/* Table */}
            <div className="text overflow-x-auto relative mt-48 pb-20">        
            <table className="md:text-md border-collapse table-auto border border-slate-200 w-full">
            <thead className='text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                        <th scope="col" class="border py-3 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white">S/n</th>
                        <th scope="col" class="border py-3 px-6 bg-slate-100  dark:bg-slate-600 dark:text-white">Name</th>
                        <th  scope="col" class="border py-3 px-3 bg-slate-100  dark:bg-slate-600 dark:text-white hidden lg:flex">Proffession</th>
                        <th  scope="col" class="border py-3 px-3 bg-slate-100  dark:bg-slate-600 dark:text-white">Actions</th>
                        {/* <th  scope="col" class="border py-3 px-6 bg-slate-200">Contact</th> */}

                  </tr>
            </thead>
                  {userArr.map((val, ind) => (
                        <>
                        <tbody className=''>
                              <tr key={ind} className='cursor-pointer' onTouchEnd={handleDocProfile} onClick={handleDocProfile} onTouchStart={() =>setclickedUsers(val._document.data.value.mapValue.fields)} onClickCapture={() =>setclickedUsers(val._document.data.value.mapValue.fields)}>
                                    <td  class="border py-3 pl-5">{ind+1}</td>
                                    <td  class="border py-3 px-2">Dr. {val._document.data.value.mapValue.fields.firstname.stringValue}</td>
                                    <td class="border py-3 px-2 hidden lg:flex">{val._document.data.value.mapValue.fields.fieldOfSpecialization.stringValue}</td>
                                    <td class="border py-1 px-1 dark:hover:bg-slate-500"  title="click to see full details">
                                          <button className="text rounded w-full h-full  bg-sky-200 hover:bg-blue-700 hover:text-white">See details</button>
                                    </td>
                              </tr>
                        
                        </tbody>

                              </>
                              ))}
                  </table>
            </div>
      </div>
      {/* Each user's profile and display field at larg Screen */}
      <div className={userProfileData2}>
            <div className="text bg-gray-50 h-auto lg:w-1/3 mx-2 dark:bg-slate-700  dark:text-white shadow-inner shadow-gray-300 hidden fixed right-0 lg:grid px-10 py-10 mt-6">
                              <button className="text animate-bounce absolute right-20 text-3xl top-6 " onClick={handleBackArr}><FaArrowLeft/></button>
                              <div className="text mb-8 flex">
                                    <div className="text w-32 h-32 rounded-full bg-gray-200 dark:bg-slate-400">
                                    {!profilePics? 
                                    <img src={img} alt="" className='w-full rounded-full h-full p-1' />:
                                    <img src={profilePics} alt="" className="text h-full rounded-full w-full p-1" />
                                   
                                    }
                                    </div>
                                    <div className="text flex ml-10 mt-12 gap-6">
                                        <div className="text h-10 pt-2 bg-blue-100 px-5 dark:bg-slate-500">Status:</div>
                                        <div className="text-center pt-2 bg-blue-100 w-40 h-10 text-sm font-mono font-extrabold dark:bg-slate-500">{status}</div>
                                    </div>
                              </div>
                              <div className="text">
                                    <div className="text  border-b">
                                          <span className="text font-bold">Full Name:</span>
                                          <span className="text pl-20">Dr. {clickedUserSur}</span>
                                          <span className="text pl-4">{clickedUserFir}</span>
                                    </div>
                                    <div className="text w-full border-b my-8">
                                          <span className="text font-bold">Email:</span>
                                          <span className="text pl-20">{clickedUserEm}</span>
                                    </div>
                                    <div className="text w-full border-b my-8">
                                          <span className="text font-bold">Contact:</span>
                                          <span className="text pl-20">{clickedUserCon}</span>
                                    </div>
                                    <div className='text'>
                                          <div className="text w-full border-b">
                                                <span className="text font-bold">Profession:</span>
                                                <span className="text pl-20">{clickedUserPro}</span>
                                          </div>
                                    </div>
                              </div>
                              <div className="text grid">
                                    <h1 className="text-xl text-center mt-16 font-bold">Contact The Doctor</h1>
                                    <select name="" id="" className="dark:bg-slate-300 dark:text-black bg-slate-100 outline-0 py-2 my-4 px-6">
                                          <option value="Choose" className="text dark:text-black" hidden>Choose</option>
                                          <option value="CheckUp" className="text dark:text-black">CheckUp</option>
                                          <option value="Treatment" className="text dark:text-black">Treatment</option>
                                    </select>
                                    <input type="date" className=" dark:text-black dark:bg-slate-300  bg-slate-100 outline-0 py-1 my-4 px-6" />
                              <button onClick={handleSchedule} className="text-white font-bold text-lg hover:bg-blue-700 bg-blue-500 py-1 ">Schedule</button>
                              </div>
            </div>

      </div>
      {/* Each user's profile and display field at Smaller Screen  */}
      <div className={userProfileData1}>
            <div className="text bg-gray-100 h-full  dark:bg-slate-700  dark:text-white shadow-inner shadow-gray-300 fixed right-0  p-7 lg:hidden w-full ">
                              <button className="text animate-bounce absolute right-20 text-3xl top-6 " onClick={handleBackArr}><FaArrowLeft/></button>
                              <div className="text mb-8 flex w-ful l">
                                    <div className="text border w-24 h-24 rounded-full bg-gray-200 dark:bg-slate-400">
                                    {!profilePics? 
                                    <img src={img} alt="" className='w-full rounded-full h-full p-1' />:
                                    <img src={profilePics} alt="" className="text  w-full rounded-full h-full p-1 " />
                                    }
                                    </div>
                                    <div className="text flex ml-3 mt-10 gap-3">
                                        <div className="text h-10 pt-2 bg-blue-100 px-3 dark:bg-slate-500">Status:</div>
                                        <div className="text-center pt-2 bg-blue-100  h-10 text-xl font-mono font-extrabold dark:bg-slate-500 px-3">{status}</div>
                                    </div>
                              </div>
                              <div className="text-sm">
                                    <div className="text-sm w-full border-b">
                                          <span className="text-sm font-bold">Name:</span>
                                          <span className="text-sm pl-3">Dr. {clickedUserSur}</span>
                                          <span className="text-sm pl-3">{clickedUserFir}</span>
                                    </div>
                                    <div className="text-sm w-full border-b my-8">
                                          <span className="text-sm font-bold">Email:</span>
                                          <span className="text-sm pl-4">{clickedUserEm}</span>
                                    </div>
                                    <div className="text-sm w-full border-b my-8">
                                          <span className="text-sm font-bold">Contact:</span>
                                          <span className="text-sm pl-4">{clickedUserCon}</span>
                                    </div>
                                    <div className='text-sm'>
                                          <div className="text-sm w-full border-b">
                                                <span className="text-sm font-bold">Profession:</span>
                                                <span className="text pl-4">{clickedUserPro}</span>
                                          </div>
                                    </div>
                              </div>
                              {/* User's profile handler */}
                              <div className={doctCont} >
                                    <h1 className="text-xl text-center mt-8 font-bold">Contact The Doctor</h1>
                                    <select name="" id="" className="w-full dark:bg-slate-300 dark:text-black bg-slate-200 outline-0 py-2 my-4 px-6">
                                          <option value="Choose" className="text" disabled>Choose</option>
                                          <option value="CheckUp" className="text">CheckUp</option>
                                          <option value="Treatment" className="text">Treatment</option>
                                    </select>
                                    <input type="date" className="w-full dark:bg-slate-300 dark:text-black  bg-slate-200 outline-0 py-2 my-4 px-6" />
                              <button onClick={handleSchedule} className="text-white font-bold text-lg hover:bg-blue-700 bg-blue-500 py-1 mt-">Schedule</button>
                        </div>
                        <div className={marque}>
                              <h1 className="text mt-32 mx-auto font-mono font-bold text-2xl">This is Your profile</h1>
                              {/* <p className="mx-auto font-mono font-bold text-3xl mt-5">You Also A Doctor</p> */}
                        </div>
            </div>

      </div>

    </section>

{/* Optional sidenav */}
    <div className={sideNav}>
                          <div className="text-white w-72 h-full bg-slate-400 dark:bg-slate-700 dark:border-t-2 dark:text-white text-lg dark:border-r-gray-500 right-0 top-16 fixed md:hidden">
                          <h1 className="z-auto text-center mt-10 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-red-400 to-blue-600 font-mono">WastroMedics</h1>
                          <div className="w-full">
                                    <ul className="text mx-auto  border-b border-b-gray-500  pb-10 w-4/5 lg:mx-auto mt-10">
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
                                    <ul className="text mt-5  w-4/5 mx-auto">
                                        <NavLink to='/contacts' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaPhoneAlt className="text-sm mr-3 my-4 "/>
                                                <li className=" border-gray-400 text-sm my-3">CONTACTS</li>
                                        </NavLink>
                                        {/* <NavLink to='/faq' exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline underline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaUser className="text-sm mr-3 my-8 "/>
                                                <li className="border-gray-400 text-sm my-6">FAQ</li>
                                        </NavLink> */}
                                        <NavLink exact activeclassName={active} className={'flex hover:font-bold hover:transition hover:underline undsmline-offset-2 ease-in-out md:-translate-x-16 hover:scale-110 '}>
                                                <FaSignOutAlt className="text-sm mr-3 my-4  text-red-700 ml-4"/>
                                                <li className="border-gray-400 text-sm my-3 text-red-700" onClick={handleLogOut}>LOGOUT</li>
                                        </NavLink>
                                    </ul>
                              </div>
                          </div>
                      </div>
    </>
  )
}

export default DoctorComp