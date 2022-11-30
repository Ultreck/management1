// import { Bar } from 'react-chartjs-2';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import VBar from './charts/VBar';
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import SignUp2 from './components/SignUp2';
import Profiles from './pages/Profiles';
import LoginPage from './components/LoginPage'
import Doctors from './pages/Doctors';
import Schedules from './pages/Schedules';
import Contacts from './pages/Contacts';
import Faq from './pages/Faq';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

function App(options, data, props) {
  // AOS.init()
  
  const [profileDataMast, setprofileDataMast] = useState({})
  const [profilePics, setprofilePics] = useState(null)
  const [timeFrame, settimeFrame] = useState()
  // console.log(timeFrame);


  
  return (
    <>
    <div className="text overflow-hidden w-full">
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/patientSignUp' element={<SignUp/>}></Route>
            <Route path='/docSignUp' element={<SignUp2/>}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/dashboard' element={<Dashboard setprofileDataMast={setprofileDataMast}/>}></Route>
            <Route path='/profiles' element={<Profiles profileDataMast={profileDataMast}/>}></Route>
            <Route path='/doctors' element={<Doctors profileDataMast={profileDataMast} />}></Route>
            <Route path='/schedules' element={<Schedules/>}></Route>
            <Route path='/contacts' element={<Contacts/>}></Route>
            <Route path='/faqq' element={<Faq/>}></Route>
            {/* <Route path='/' element={<LoginPage settimeFrame={settimeFrame}/>}></Route> */}
            {/* <Route path='/' element={<VBar timeFrame={timeFrame} />}></Route> */}
        </Routes>
    </div>
</>
  );
}

export default App;
