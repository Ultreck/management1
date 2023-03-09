import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import bgimg1 from '../images/human_body_system_no_label-removebg-preview.png';
// import formimg from '../images/ss9.jpg';
// import {FaArrowRight} from 'react-icons/fa';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
      const [loader, setloader] = useState('loader');
      // const [data, setdata] = useState({});
      const navigate = useNavigate();
      
            useEffect(() => {
                  setloader('text');
            }, [])

            const randomFunctCreate = (e) =>
            {
            let randomNumber = '0123456789';
            let iniitializindNumber = '01';
            let randomAll = "";
            let totalRandom;
            for(let r = 0; r < e; r++){
                  randomAll += randomNumber.charAt(Math.floor(Math.random() * randomNumber.length))
            totalRandom = iniitializindNumber.concat(randomAll);
            // setautoCardNo(totalRandom)
            //     console.log(autoCardNo);
            }
            return totalRandom;
            }
      const [allUsersData, setallUsersData] = useState({
            firstname:"",
            surname:"",
            contact:"",
            email:"",
            password:"",
            address:"",
            age:"",
            cardno: randomFunctCreate(3),
            gender:"",
      })
 const handleChange = (e) =>{
       const {value, name} = e.target;
       setallUsersData({...allUsersData, [name]:value})
      //  console.log(allUsersData);
}



const handleSubmit = () =>{
      navigate("/login");

 }
 

      // const [succMsg, setsuccMsg] = useState()
      const [succClass, setsuccClass] = useState('hidden mx-auto mb-3 flex w-full items-center rounded-lg bg-green-200  py-3 px-6 text-base text-green-700  md:w-1/2')
      const [errClass, seterrClass] = useState('hidden mx-auto flex mb-3 w-full items-center rounded-lg bg-yellow-200 py-3 px-6 text-base text-yellow-800  md:w-1/2  ')
      // const [errMsg, seterrMsg] = useState()
      // const [parentEle, setparentEle] = useState('flex')

      // const handleSuccess = () =>{
      //       // e.preventDefault();
      //       setsuccClass('hidden')
            
      // }
      // const handleError = () =>{
      //       // e.preventDefault();
      //       seterrClass('hidden')
            
      // }

      // Card number creating function/random


      // Show password function
      const [type, settype] = useState('password')
      const [icon, seticon] = useState(eyeOff)
      const handleAuth = () => {
            // e.preventDefault();
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
    
//     Form registration and extentions
      // const {register, handleSubmit, formState:{errors}} =useForm()
    
      // Sign up function
      const signUp = async() => {
            // e.preventDefault();
            try {
                  const docRef = await addDoc(collection(db, "patientsData"), allUsersData);
                  console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                  console.error("Error adding document: ", e);
            }
            
      } 
      const createdStampTime = async() =>{
            // e.preventDefault();
            try{
                  const timeStamp = await addDoc(collection(db, "patientTimeStamp"), {createdAt:serverTimestamp()});
                  console.log("Document written with ID: ", timeStamp.createdAt);
            }catch(e){
                  console.log("Document written with ID: ", e);
            }

          }

      //     Function authentication
          const formAuth = (e) => {
            // e.preventDefualt();
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, allUsersData.email, allUsersData.password)
            .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(user);
                  signUp();
                  createdStampTime();
                  setsuccClass('mb-3 mx-auto flex w-full md:w-1/2 mx-auto items-center rounded-lg bg-green-300  py-3 px-6 text-base text-green-700');
                  seterrClass('hidden mb-3 mx-auto w-full items-center  md:w-1/2 mx-auto  rounded-lg bg-yellow-200 py-3 px-6 text-base text-yellow-800');
                  setTimeout(handleSubmit, 4000)
                  
            })
            .catch((error) => {
                  setsuccClass('mb-3 mx-auto hidden w-full md:w-1/2 mx-auto items-center rounded-lg bg-green-300  py-3 px-6 text-base text-green-700');
                  seterrClass('flex mb-3 mx-auto w-full items-center  md:w-1/2 mx-auto  rounded-lg bg-yellow-200 py-3 px-6 text-base text-yellow-800');
            });
          }

  return (
    <>
<div className={loader}></div>
   <div className="text  bg-white dark:bg-slate-800 h-screen pt-20 px-5 bg-no-repeat  bg-cover bg-center"  style={{backgroundImage:`url(${bgimg1})`}}>

{/* Success Alerts */}
<div className={succClass} role="alert">
  <span className="mr-2">
    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 ">
      <path
        fill-rule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clip-rule="evenodd" />
    </svg>
  </span>
     Sucessfully Sign Up.
</div>

{/* Warning Alert */}
<div className={errClass} role="alert">
  <span className="mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 ">
      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
    </svg>
  </span>
  Account Already Exists.
  <Link className='text-blue-500  ml-20 text-lg font-bold underline' to='/login' title='login'>Log in?</Link>
</div>

   <div className='mx-auto shadow-lg px-5 py-3 md:px-10 rounded-md  max-w-sm md:max-w-md lg:max-w-lg h-auto  bg-white dark:bg-slate-800'>
      {/* <form className="text" onSubmit={formAuth}> */}
            <h3 className="text-white py-2 font-bold text-2xl">Sign Up</h3>
            <input name='firstname' placeholder='Sur name' onChange={handleChange} value={allUsersData.firstname} type="text" className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <input name='surname' placeholder='First name' onChange={handleChange} value={allUsersData.surname} type="text" className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <input name='contact' placeholder='Contact' onChange={handleChange} value={allUsersData.contact} type="text" className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <input name='email' placeholder='Email' onChange={handleChange} value={allUsersData.email} type="email" className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <input name='password' placeholder='Password' onChange={handleChange} value={allUsersData.password} type={type} className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <label htmlFor="" onClick={handleAuth} className=' absolute -translate-x-10 translate-y-3'><Icon icon={icon}/></label>
            <input name='address' placeholder='Address' onChange={handleChange} value={allUsersData.address} type="text" className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <input name='age' placeholder='Age' onChange={handleChange} value={allUsersData.age} type="text" className="text w-full rounded p-1 my-2 placeholder:italic placeholder:text-slate-400 border outline-none" />
            <select name="gender" id="gender" onChange={handleChange} value={allUsersData.gender}  className="text w-full rounded p-1 my-2 border outline-none">
                  <option value="choose gender" className='text-slate-400  ' hidden>choose gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
            </select>
            <div className="text-end">
                  { 
            allUsersData.firstname === "" ||  allUsersData.surname === "" || allUsersData.contact === "" ||   allUsersData.email === "" || allUsersData.password === "" || allUsersData.address === "" || allUsersData.age === "" ||  allUsersData.gender === ""?<button onClick={formAuth} className="text-white  w-1/2  my-2 bg-sky-400/90 p-1" disabled title='Button is disabled'>Disabled</button>:<button onClick={formAuth} className="text-white  w-1/2  my-2 bg-blue-600 p-1 hover:scale-105 hover:rounded-md hover:bg-blue-800 ">Submit</button>
            
          
            }
            </div>
      {/* </form> */}
    </div>
   </div>
    </>
  )
}

export default SignUp
