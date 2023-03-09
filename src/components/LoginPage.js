import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore/lite';
import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";
import {Icon} from 'react-icons-kit';
import img from '../images/human_body_system_no_label-removebg-preview.png'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {useForm} from 'react-hook-form';
import { stringify } from 'postcss';


const LoginPage = ({settimeFrame}) => {
  // const [users, setusers] = useState()
  // const [firestorePtEmail, setfirestorePtEmail] = useState()
  // const [logInEmail, setlogInEmail] = useState()
  // const [logInPassword, setlogInPassword] = useState()
  const [allUsersData, setallUsersData] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const [loader, setloader] = useState('loader')
   
useEffect(() => {
  setloader('text')
}, [])

const handleChange = (e) =>{
  const {value, name} = e.target;
  setallUsersData({...allUsersData, [name]:value})
 //  console.log(allUsersData);
}


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
    

      
      const handleLogin = (e) =>{
        e.preventDefault();
        // console.log(allUsersData.email, allUsersData.password);
      signInWithEmailAndPassword(auth, allUsersData.email, allUsersData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        let userEmail = user.email;
        console.log(user);
        localStorage.setItem("currentUserEmail", JSON.stringify(userEmail));
        navigate('/dashboard') 
        window.alert("Successfully Login");
      })
      .catch((error) => {
        const errorMessage = error;
        window.alert(errorMessage)
      });
      
      }


  return (
    <>
     <div className={loader}></div>
     <div className="text bg-cover bg-no-repeat bg-center w-full h-screen pt-40 dark:bg-slate-800 dark:text-white" style={{backgroundImage:`url(${img})`}}>
              <div className="mx-auto  shadow-lg px-6  md:px-12 rounded-md  max-w-sm md:max-w-md lg:max-w-lg h-auto  bg-white border dark:border-slate-700 dark:bg-slate-700 dark:text-white py-10" >
                        <h1 className="text-xl font-mono font-bold">Sign In</h1>
                       <form  className="text grid grid-cols-1 mt-3" onSubmit={handleLogin}>
                       <input name='email' placeholder='Email' onChange={handleChange} value={allUsersData.email} type="email" className="text w-full rounded p-1 dark:bg-slate-200 dark:text-black my-4 placeholder:italic placeholder:text-slate-400 border outline-none" />
                      <input name='password' placeholder='Password' onChange={handleChange} value={allUsersData.password} type={type} className="text w-full rounded p-1 dark:bg-slate-200 dark:text-black my-4 placeholder:italic placeholder:text-slate-400 border outline-none" />
                      <div className="text-end mr-10">
                          <label htmlFor="" onClick={handleAuth} className='text-center absolute  w-10 dark:text-slate-900 -translate-y-12'><Icon icon={icon}/></label>
                      </div>
                      <div className="text-end">
                          <button className="text bg-blue-600 w-1/2 mx-auto py-1 text-white font-bold  font-serif mt-5 hover:scale-105 hover:bg-blue-500 ">Login</button>
                      </div>
                       </form>
                  </div>

     </div>
    </>
  )
}

export default LoginPage
