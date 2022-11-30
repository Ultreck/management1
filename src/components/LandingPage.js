import React, { useState, useEffect } from 'react';
import img from '../images/human_body_system_no_label-removebg-preview.png';
import Footer from './Footer';
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashboard = () => {
      const [loader, setloader] = useState('loader')
      AOS.init();
      useEffect(() => {
            setloader('text')
      }, [])
      
  return (
    <>
    <div className={loader}></div>
     <main className="text flex">
            <div className="text md:w-1/4 hidden lg:flex bg-orange-400 h-screen p-8">
                 <div className="text">
                        <p className="text-white font-semibold text-xl">
                              Welcome to <span className="text-black  font-mono font-bold">WastroTech </span><span className="text-black"> Medical Management System.</span> a leading health centre, offering a range of medical services like <span className="">Chiropractic, Physical Therrapy, Dentist </span>and <span className="">Eye Exam.</span>
                        </p>
                        <p className="text-white mt-6  font-semibold text-xl">We specialising  in working  with different issues and our ability to provide medical services in over 20 languages, we are sure you will find the right doctor to help you. We work with individuals, couples and families, supporting adults, children and adolescents.</p>
                        <p className=" text-white mt-6  font-semibold text-xl">for you to  be able to consult our doctors and to have more accessbilities to our  medical management system, You'll have to register.</p>
                         <div className="text-center mx-auto py-10 bg-neutral-200 rounded shadow-inner shadow-gray-700 drop-shadow-lg mt-20">
                              <button className="text-white hover:scale-105 font-semibold  bg-orange-300 w-2/5 rounded-full py-1 mx-2 shadow-lg shadow-orange-400">
                                    <a href="/login" className="text">Login</a>
                              </button>
                              <button className="text-white hover:scale-105 font-semibold  bg-pink-500 w-2/5 rounded-full py-1 mx-2 shadow-lg shadow-pink-400">
                                    <a href="patientSignUp" className="text">Sign Up</a>
                              </button>
                        </div>
                 </div>
            </div>
            <div className="text w-full 2xl:-3/4 bg-slate-200  bg-fixed bg-no-repeat bg-cover h-screen overflow-auto scroll-smooth" style={{backgroundImage:`url(${img})`}}>
                  <div className="text hidden lg:flex w-10 h-10 rounded absolute bg-red-600 animate-spin top-40 left-2/5"></div>
                  <div className="text hidden lg:flex w-10 h-10 rounded absolute bg-red-600 animate-spin top-40 left-2/5 translate-x-20"></div>
                  {/* <div className="text hidden md:flex w-10 h-10 rounded-full absolute bg-green-400  animate-bounce right-32 top-48"></div> */}
                  {/* <div className="text hidden md:flex w-10 h-10 rounded-full absolute bg-blue-600  animate-bounce right-32 top-60"></div> */}
                  <div className="text hidden md:flex z-auto w-10 h-10 rounded-full absolute bg-gray-500 right-28 animate-ping bottom-44"></div>
                 
                 <h1 className="z-auto text-center mt-10 text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-red-400 to-blue-600">Medical Management System</h1>
                 <div className="z-10 text bg-slate-200 mx-6  md:w-3/4 md:mx-auto rounded-tl-lg rounded-tr-lg">
                        <div className="z-10 text md:w-3/4 mx-auto mt-72">
                              <h3 className="z-10 text-center text-2xl font-semibold pt-10 pb-2">The chiropractic treatments we provide</h3>
                              <p className="z-10 text-xl mx-auto px-6">We offer chiropractic treatment for the whole family. From babies and children, through to adults of all ages, we are dedicated to providing you with an outstanding experience, and effective treatment.
                                Your chiropactor will tailor each session to help you and your loved ones resolve their pain and discomfort, no matter what the symptom, Treatment deals with the whole body, with your cental nervous system at its core - depending on the issue, your chiropractor may also provide muscle work, dry needling, stretches and trigger point therapy and dietary advice alingside adjustments.</p>
                        </div>
                        <div className="z-10 text md:w-3/4 mx-auto">
                              <h3 className="z-10 text-center text-2xl font-semibold mt-10 pb-2">Physical Therapy We Provide</h3>
                              <p className="z-10 text-xl mx-auto px-6 "> Orthopaedics, in conjuction with  
                               offers physical therapy for individuals with orthopaedic diseases, disorders or injuries and those recovering from orthopaedic surgery. This comprehensive program includes a rehabilitation gym. underwater treadmills and equipment for treatment and correctness.</p>
                        </div>
                        <div className="z-10 text md:w-3/4 mx-auto" >
                              <h3 className="z-10 text-center text-2xl font-semibold mt-10 pb-2">We Provide Kid Friendly Dentist</h3>
                              <p className="z-10 text-xl mx-auto px-6 ">As a kid friendly dentist in Nigeria we treat young children, including preschooler and elementary age children, for their first checkup. We
                              realize that a lot of parents do not bring their child to the dentist until they are much older. This, however, is a mistake. Your child can develop cabities as young as their toddler years and visiting our kid friendly dentist office is one way to help prevent them.</p>
                        </div>
                        <div className="z-10 text md:w-3/4 mx-auto pb-10">
                              <h3 className="z-10 text-center text-2xl font-semibold mt-10 pb-2">We Provide Eye Exams</h3>
                              <p className="z-10 text-xl mx-auto px-6 ">Here we do things differently 
                              are 45 minutes long and you will be under the care of an industry-learning optometrist who will spend the time getting to know you, your eyes and your lifestyle.</p>
                        </div>
                        <div className="z-10 text-center mx-auto mt-10 md:hidden pb-10">
                              <button className="z-10 text hover:scale-105 font-semibold bg-orange-300 w-1/3 rounded-full py-1 mx-2 shadow-lg shadow-orange-400">
                                    <Link to="/login" className="text">Login</Link>
                              </button>
                              <button className="z-10 text-white hover:scale-105 font-semibold bg-pink-500 w-1/3 rounded-full py-1 mx-2 shadow-lg shadow-pink-400">
                                    <Link to="/patientSignUp">Sign Up</Link>
                              </button>
                        </div>
                 </div>
                 <div className="z-10 text mx-auto   md:w-3/4 mt-6">
                        <Footer className=' '/>
                 </div>
                              {/* <a href="https://www.thisislondonwellness.com/treatments/chiropractic/" className="z-10 text-sky-400 underline">The London Wellness Centre</a>,  */}
                              {/* <a href="https://www.cedars-sinai.org/" className="z-10 text-pink-400 underline">Ceddars-Sinai Outpatient Rehabilitaion services</a> */}
                              {/* <a href="https://www.newyorkdentaloffice.com/new-york-ny/kid-friendly-dentist/" className="z-10 text-sky-400 underline">Kid Friendly Dentist</a>  */}
                              {/* <a href="https://www.newyorkdentaloffice.com/new-york-ny/kid-friendly-dentist/" className="z-10 text-sky-400 underline">Eye Exams</a>  */}

            </div>
     </main>
    </>
  )
}

export default Dashboard
