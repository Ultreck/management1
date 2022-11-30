import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import { initializeApp } from 'firebase/app';
import { getDocs, collection, getFirestore } from 'firebase/firestore/lite';
import {  getStorage, ref,  getDownloadURL } from 'firebase/storage';
import VBar from '../charts/VBar';
import {FaUser, FaTachometerAlt,  FaUserCircle, FaCalendar, FaUserNurse, FaPhoneAlt, FaSignOutAlt, FaDollarSign, FaBed, FaUserFriends, FaWalking} from 'react-icons/fa';
import img from '../images/zz4.jpg'
import {NavLink} from 'react-router-dom';
// import options from '../charts/DocLineChart';
import SideNav from './SideNav';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import DocLineChart from '../charts/DocLineChart';
import PatLineChart from '../charts/PatLineChart';
import ScheduleChart from '../charts/ScheduleChart';
import Profiles from '../pages/Profiles';


const Dashboard = ({setprofileDataMast}) => {
      const navigate = useNavigate();
      // UseState section
      const [doctorsLenght, setdoctorsLenght] = useState()
      const [snapShortData1, setsnapShortData1] = useState([])
      const [snapShortData2, setsnapShortData2] = useState([])
      const [patietLenght, setpatietLenght] = useState()
      const [timeStampDoc, settimeStampDoc] = useState([])
      const [timeStampPat, settimeStampPat] = useState([])
      const [docMon, setdocMon] = useState([])
      const [docTue, setdocTue] = useState([])
      const [docWed, setdocWed] = useState([])
      const [docThu, setdocThu] = useState([])
      const [docFri, setdocFri] = useState([])
      const [docSat, setdocSat] = useState([])
      const [docSun, setdocSun] = useState([])
      const [docMonp, setdocMonp] = useState([])
      const [docTuep, setdocTuep] = useState([])
      const [docWedp, setdocWedp] = useState([])
      const [docThup, setdocThup] = useState([])
      const [docFrip, setdocFrip] = useState([])
      const [docSatp, setdocSatp] = useState([])
      const [docSunp, setdocSunp] = useState([])
      const [profileData, setprofileData] = useState({})
      const [profilePics, setprofilePics] = useState()
      const [email, setemail] = useState(JSON.parse(localStorage.getItem("currentUserEmail")));
      const [loader, setloader] = useState('loader')

      const [sideNav, setsideNav] = useState('flex');
      // const [useEffectCtl, setuseEffectCtl] = useState(1)
      const [active, setactive] = useState('font-bold transition underline underline-offset-2 ease-in-out scale-110')
      setprofileDataMast(profileData)
      //     Use Effect Hooks for the whole available function throught the whole page
      useEffect(() => {
            getDocTimeStamp();
            getPatTimeStamp();
            getDrData();
            getPtData();
            const downloadUrl = ref(storage, `profilePics/${email}`);
            getDownloadURL(downloadUrl).then((url) => {
                  if(url){
                        setprofilePics(url);
                  }
                  else{
                        return;
                  }
            });

            setloader('text')
            setsideNav('hidden')
          }, [])

      // Firebase set up and configuraiton path
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
          const app = initializeApp(firebaseConfig);
          const db = getFirestore(app);
          const storage = getStorage(app);


      //     Data Collection Function for both doctor and patient
          const getDrData = async() => {
            const querySnapshot = await getDocs(collection(db, "doctorsData"));
            setdoctorsLenght(querySnapshot.docs.length)
            let userEmail =JSON.parse(localStorage.getItem("currentUserEmail")) ;
            setsnapShortData1(querySnapshot._docs._document);
            querySnapshot.forEach((doc, indx) => {
                  if(doc.data().email === userEmail){
                        setprofileData(doc.data());
                        // setloader('text')
                        setprofileDataMast(doc.data());
                  }
            });
      }
      const getPtData = async() => {
            const querySnapshot = await getDocs(collection(db, "patientsData"));
            let userEmail =JSON.parse(localStorage.getItem("currentUserEmail")) ;
            setpatietLenght(querySnapshot.docs.length);
            setsnapShortData2(querySnapshot._docs);
            querySnapshot.forEach((doc, indx) => {
                  if(doc.data().email === userEmail){
                        setprofileData(doc.data());
                        setprofileDataMast(doc.data());
                        setemail(userEmail);
                        //    setloader('text')
                  }
                
            });
          }


          const getDocTimeStamp = async() => {
                const querySnapshot = await getDocs(collection(db, "doctorTimeStamp"));
                settimeStampDoc(querySnapshot.docs)
                let monday = [];
                let tuesday = [];
                let wednesday = [];
                let thursday = [];
                let friday = [];
                let saturday = [];
                let sunday = [];
            querySnapshot.forEach((doc, indx) => {
                  let allDates = doc._document.data.value.mapValue.fields.createdAt.timestampValue;
                  // settimeStampDoc(new Date(allDates).getDay());
                  let datatime = new Date(allDates).getDay();
                  if(datatime ===1){
                        monday.push(allDates)
                        setdocMon(monday);
                        // console.log(monday);
                  }
                  else if(datatime === 2){
                        tuesday.push(allDates)
                        setdocTue(tuesday);
                  }
                  else if(datatime === 3){
                        wednesday.push(allDates)
                        setdocWed(wednesday)
                  }
                  else if(datatime === 4){
                        thursday.push(allDates)
                        setdocThu(thursday)
                  }
                  else if(datatime === 5){
                        friday.push(allDates)
                        setdocFri(friday)
                  }
                  else if(datatime === 6){
                        saturday.push(allDates)
                        setdocSat(saturday)
                  }
                  else if(datatime === 7){
                        sunday.push(allDates)
                        setdocSun(sunday)
                  }
            });
          }
          const getPatTimeStamp = async() => {
                const querySnapshot = await getDocs(collection(db, "patientTimeStamp"));
                settimeStampPat(querySnapshot.docs)
                let monday = [];
                let tuesday = [];
                let wednesday = [];
                let thursday = [];
                let friday = [];
                let saturday = [];
                let sunday = [];
            querySnapshot.forEach((doc, indx) => {
                  let allDates = doc._document.data.value.mapValue.fields.createdAt.timestampValue;
                  // settimeStampPat(new Date(allDates).getDay());
                  let datatime = new Date(allDates).getDay();
                  if(datatime === 1){
                        monday.push(allDates)
                        setdocMonp(monday)
                  }
                  else if(datatime === 2){
                        tuesday.push(allDates)
                        setdocTuep(tuesday)
                  }
                  else if(datatime === 3){
                        wednesday.push(allDates)
                        setdocWedp(wednesday)
                        // console.log(docWedp);
                  }
                  else if(datatime === 4){
                        thursday.push(allDates)
                        setdocThup(thursday)
                  }
                  else if(datatime === 5){
                        friday.push(allDates)
                        setdocFrip(friday)
                  }
                  else if(datatime === 6){
                        saturday.push(allDates)
                        setdocSatp(saturday)
                  }
                  else if(datatime === 7){
                        sunday.push(allDates)
                        setdocSunp(sunday)
                  }
            });
          }
          
//          Handle Log out Function
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
    <>
     <div className={loader}></div>
            <main className="text">
                  <div className="text z-50">
                        <NavBar className='' profilePics={profilePics} setsideNav={setsideNav} sideNav={sideNav}/>
                  </div>
                 <section className="text flex dark:bg-slate-900 ">
                  <div className="text">
                        <SideNav profileData={profileData} className=''/>
                  </div>

                  <div className=" bg-white p-4 md:ml-96 w-full  sm:w-3/5 md:h-auto lg:h-screen md:w-full lg:w-4/5  mt-20 dark:bg-slate-900  dark:text-white text-lg lg:p-8 mx-auto">
                        <div className="text lg:flex overflow-auto">
                              <div className="text md:w-2/3  bg-white dark:bg-slate-800 dark:text-white md:mx-2 p-5 rounded-xl my-4 h-72 shadow-inner drop-shadow-lg shadow-gray-300">
                                   <div className="text ">
                                          <div className="text flex relative w-full md:px-8 border-b pb-2">
                                                <p className="text  w-full">Total Doctor's</p>
                                                <div className="text w-48 dark:bg-pink-500 h-10 bg-pink-400 ml-14 md:ml-20 rounded-lg ">
                                                      <div className="text-center font-mono font-bold text-3xl">{doctorsLenght} </div>
                                                </div>
                                          </div>
                                          <div className="md:w-5/6 w-full mx-auto -translate-y-3 mt-3 ">
                                                <DocLineChart className="relative " timeStampDoc={timeStampDoc} docMon={docMon} docTue={docTue} docWed={docWed} docThu={docThu} docFri={docFri} docSat={docSat} docSun={docSun} />
                                          </div>
                                   </div>
                              </div>
                              <div className="text md:w-2/3  bg-white dark:bg-slate-800 dark:text-white md:mx-2 p-5 rounded-xl my-4 h-72  shadow-inner drop-shadow-lg shadow-gray-300">
                              <div className="text ">
                                          <div className="text flex relative w-full md:px-8 border-b pb-2">
                                                <p className="text  w-full">Total Patient's</p>
                                                <div className="text w-48 h-10 bg-orange-400 ml-20 rounded-lg dark:bg-orange-500">
                                                      <div className="text-center font-mono font-bold text-3xl">{patietLenght} </div>
                                                </div>
                                          </div>
                                          <div className="md:w-5/6 w-full mx-auto -translate-y-3  mt-3">
                                                <PatLineChart docMonp={docMonp} docTuep={docTuep} docWedp={docWedp} docThup={docThup} docFrip={docFrip} docSatp={docSatp} docSunp={docSunp}/>
                                          </div>
                                   </div>
                              </div>
                              <div className="text md:w-2/3  bg-white dark:bg-slate-800 dark:text-white md:mx-2 p-5 rounded-xl my-4 h-72  shadow-inner drop-shadow-lg shadow-gray-300">
                              <div className="text ">
                                          <div className="text flex relative w-full md:px-8 border-b pb-2">
                                                <p className="text w-full">Total Schedule's</p>
                                                <div className="text w-48 h-10 bg-blue-400 ml-20 rounded-lg dark:bg-blue-500">
                                                      <div className="text-center font-mono font-bold text-3xl">100</div>
                                                </div>
                                          </div>
                                          <div className="md:w-5/6 w-full mx-auto -translate-y-3  mt-3">
                                                <ScheduleChart/>
                                          </div>
                                   </div>
                              </div>
                        </div>
                        <div className="text lg:flex overflow-hidden">
                              <div className="text md:w-2/3  bg-white dark:bg-slate-800 dark:text-white md:mx-2 p-5 rounded-xl my-4 h-96  shadow-inner drop-shadow-lg shadow-gray-300">
                                   <VBar 
                                   docMon={docMon} docTue={docTue} docWed={docWed} docThu={docThu} docFri={docFri} docSat={docSat} docSun={docSun}
                                   docMonp={docMonp} docTuep={docTuep} docWedp={docWedp} docThup={docThup} docFrip={docFrip} docSatp={docSatp} docSunp={docSunp}
                                   />
                              </div>
                              <div className="text flex  md:w-4/5 bg-white dark:bg-slate-800 dark:text-white md:mx-2 p-5 rounded-xl my-4 h-96  shadow-inner drop-shadow-lg shadow-gray-300">
                                   <div className="text w-1/3 border-r-2 md:pl-20 pt-10 px-3">
                                          <span className="text-center w-full ml-4">Income</span>
                                          <div className="text w-20 h-20 rounded-full  ml-1 mt-10 bg-blue-700 "></div>
                                          <span className="text w-full flex mt-14 border-b-blue-500 border-b text-2xl font-serif"><FaDollarSign className='mt-2'/>6,000,000</span>
                                   </div>
                                   <div className="text w-1/3 border-r-2 md:pl-20 px-3  pt-10">
                                          <span className="text-center ml-5 w-full">Outcome</span>
                                          <div className="text w-20 h-20 rounded-full ml-4 mt-10 bg-red-500 "></div>
                                          <span className="text w-full flex mt-14 border-b-red-500 border-b text-2xl font-serif"><FaDollarSign className='mt-2'/>1,500,000</span>
                                   </div>
                                   <div className="text-center w-1/3  md:pl-20 px-3 pt-10">
                                          <span className="text w-full">Profilt/Month</span>
                                          <div className="text w-20 h-20 rounded-full mt-10  ml-5 bg-green-600"></div>
                                          <span className="text w-full flex mt-14 border-b-green-500 border-b text-2xl font-serif"><FaDollarSign className='mt-2'/>500,000</span>
                                   </div>
                              </div>
                        </div>
                        <h1 className="text-center  md:w-4/6 font-semibold text-xl dark:text-white translate-y-2">Hospital Survey</h1>
                        <div className="text md:flex overflow-auto">
                              <div className="text md:w-full bg-slate-50 text-center dark:bg-slate-800 dark:text-white md:mx-2 p-5 rounded-xl my-4 h-auto flex-wrap shadow-inner drop-shadow-md flex">
                                         <div className="text grid w-1/2  md:w-1/4 border-r-2">
                                                <span className="text my-2 mx-auto text-3xl font-bold "><FaBed/></span>
                                                <span className="text my-2 font-mono">1,000</span>
                                                <span className="text my-2 font-mono">Number of bed</span>
                                         </div>
                                         <div className="text grid w-1/2  md:w-1/4 border-r-2">
                                                <span className="text my-2 font-mono mx-auto text-3xl font-bold "><FaUserNurse/></span>
                                                <span className="text my-2 font-mono">100</span>
                                                <span className="text my-2 font-mono">Daily surgery</span>
                                         </div>
                                         <div className="text grid w-1/2  md:w-1/4 border-r-2 mt-6">
                                                 <span className="text my-2 font-mono mx-auto text-3xl font-bold "><FaUserFriends/></span>
                                                <span className="text my-2 font-mono">150</span>
                                                <span className="text my-2 font-mono">New Patient</span>
                                         </div>
                                         <div className="text grid w-1/2  md:w-1/4  mt-6">
                                                <span className="text my-2 font-mono mx-auto text-3xl font-bold "><FaWalking/></span>
                                                <span className="text my-2 font-mono">120</span>
                                                <span className="text my-2 font-mono">Daily released</span>
                                         </div>
                              </div>
                        </div>
                  </div> 
            </section>
      </main>
                  <div className={sideNav}>
                          <div className="text-white w-80 h-screen bg-slate-400 dark:bg-slate-900 dark:text-white text-lg dark:border-r-gray-500 right-0 top-20 fixed md:hidden duration-1000 ease-in-out transition">
                          <div className="w-full">
                          <div className="md:hidden flex absolute bg-gray-300 rounded-full -translate-y-16 border border-gray-500 dark:bg-slate-500 mx-auto w-full">
                          {!profilePics? 
                        <img src={img} alt="" className='textl z-20 border-2 border-blue-600 rounded-full  w-16 h-16' />:
                        <img src={profilePics} alt="" className="textl z-20 border-2 border-blue-600 rounded-full  w-16 h-16" />
                       
                      }
                              <div className="text flex mx-auto mt-4">
                                    <span className="text-black font-semibold text-xl dark:text-white">{profileData.surname}</span>
                                    <span className="text-black font-semibold text-xl dark:text-white ml-4">{profileData.firstname}</span>
                              </div>
                              </div>
                                    <ul className="text mx-auto  border-b border-b-gray-500  pb-10 w-4/5 lg:mx-auto mt-20">
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
                                                <FaSignOutAlt className="text-lg mr-3 ml-4 underline-0 my-8 text-red-700"/>
                                                <li className="border-gray-400 text-lg my-6 underline-offset-0 text-red-700" onClick={handleLogOut}>LOGOUT</li>
                                        </NavLink>
                                    </ul>
                              </div>
                          </div>
                      </div>
    </>
  )
}

export default Dashboard
