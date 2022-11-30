import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore/lite';
import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";
import {Icon} from 'react-icons-kit';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {useForm} from 'react-hook-form';
import { stringify } from 'postcss';


const LoginPage = ({settimeFrame}) => {
  // const [users, setusers] = useState()
  // const [firestorePtEmail, setfirestorePtEmail] = useState()
  const [logInEmail, setlogInEmail] = useState()
  const [logInPassword, setlogInPassword] = useState()
  const navigate = useNavigate();
  const [loader, setloader] = useState('loader')
   
useEffect(() => {
  setloader('text')
}, [])

  // Form registration and extentions
  const {register, handleSubmit, watch, formState:{errors}} =useForm()


    // Show password function
  const [type, settype] = useState('password')
      const [icon, seticon] = useState(eyeOff)
      const handleAuth = () => {
            if(type === "password"){
                  seticon(eye);
                  settype('text');
            }
            else{
                  seticon(eyeOff);
                  settype('password');

            }
      }

 // Database setUp and ref
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
      const db = getFirestore(app);
      const auth = getAuth();
    

      
      const handleLogin = () =>{
        // e.preventDefault();
      signInWithEmailAndPassword(auth, logInEmail, logInPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        let userEmail = user.email;
        console.log(user);
        localStorage.setItem("currentUserEmail", JSON.stringify(userEmail));
        navigate('/dashboard') 
        window.alert("Successfully Login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert(errorMessage)
      });
      
      }


  return (
    <>
     <div className={loader}></div>
          <div className="text bg-gray-200 w-full dark:bg-slate-900 h-screen  overflow-hidden justify-center align-middle absolute">
          <div className="text">
                <Link to={'/patientSignUp'}>
                    <button className="text-center w-1/2 py-2 absolute right-0 text-white rounded-tl-full rounded-bl-full md:hidden font-mono font-bold bg-slate-400 mt-24">Sign Up</button>
                </Link>
              </div>
              <div className="text md:w-2/3 w-full px-6 mt-44 rounded-xl lg:w-1/2   mx-auto bg-gray-50 md:h-2/3 h-3/5 dark:bg-slate-700 dark:text-white shadow-inner  pt-10  drop-shadow-xl">
                  <div className="text-balck dark:text-white px-6 bg-white h-4/5 my-10 w-5/6 md:w-2/3 lg:w-3/5 mx-auto rounded-lg dark:bg-slate-800 shadow-inner shadow-gray-300 py-6 drop-shadow-xl">
                        <h1 className="text-3xl text-center font-mono font-bold">Sign In Page</h1>
                       <form  className="text grid grid-cols-1  gap-20 mt-10" onSubmit={handleSubmit(handleLogin)}>
                          <input type="email"  {...register("email", {required: true})} id="inpemail" onChange={(e) =>setlogInEmail(e.target.value)} className="text py-3  rounded-full px-6  focus:outline-dotted outline-2 outline-gray-800 bg-gray-100 dark:bg-slate-300 dark:focus:outline-dotted dark:outline-yellow-500 dark:text-black dark:outline-2" placeholder='email' />
                          <input  type={type}  {...register("password", {required: true})}  id="inppassword" onChange={(e) => setlogInPassword(e.target.value)} className="text py-3 rounded-full px-6  focus:outline-dotted outline-2 outline-gray-800 bg-gray-100 dark:bg-slate-300 dark:focus:outline-dotted dark:outline-yellow-500 dark:text-black dark:outline-2" placeholder='password' />
                          <span onClick={handleAuth} className="text w-20 absolute dark:text-black  py-2 text-center  z-10 right-6 rounded-full translate-y-32"><Icon icon={icon}/></span>
                          <button className="text bg-blue-500 w-1/2 mx-auto py-2 rounded-full text-white font-bold text-lg font-serif hover:scale-105 hover:bg-blue-700  hover:text-xl ">Login</button>
                       </form>
                  </div>
              </div>
              <div className="text">
                <Link to={'/'}>
                    <button className="text-center w-1/2 py-2 text-white rounded-tr-full rounded-br-full md:hidden mt-10 font-mono font-bold bg-slate-400">Landing Page</button>
                </Link>
              </div>
          </div>
    </>
  )
}

export default LoginPage
