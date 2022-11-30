import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useForm} from 'react-hook-form';
// import { useNavigation } from 'react-router-dom';
import bgimg1 from '../images/human_body_system_no_label-removebg-preview.png';
import formimg from '../images/ss9.jpg';
import {FaArrowRight} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import { Link } from 'react-router-dom';

const SignUp = () => {
      AOS.init();
      const [autoCardNo, setautoCardNo] = useState()
      const [loader, setloader] = useState('loader')

      useEffect(() => {
            randomFunctCreate(3);
            setloader('text')
      }, [])
      

      const [succMsg, setsuccMsg] = useState()
      const [succClass, setsuccClass] = useState('hidden')
      const [errMsg, seterrMsg] = useState()
      const [errClass, seterrClass] = useState('hidden')
      const [parentEle, setparentEle] = useState('flex')

      const handleSuccess = () =>{
            // e.preventDefault();
            setsuccClass('hidden')
            
      }
      const handleError = () =>{
            // e.preventDefault();
            seterrClass('hidden')
            
      }

      // Card number creating function/random
      const randomFunctCreate = (e) =>
{
      let randomNumber = '0123456789';
      let iniitializindNumber = '01';
      let randomAll = "";
      let totalRandom;
      for(let r = 0; r < e; r++){
            randomAll += randomNumber.charAt(Math.floor(Math.random() * randomNumber.length))
          totalRandom = iniitializindNumber.concat(randomAll);
          setautoCardNo(totalRandom)
      //     console.log(autoCardNo);
      }
      return totalRandom;
}


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
//     const navigate = useNavigation();
    
//     Form registration and extentions
      const {register, handleSubmit, formState:{errors}} =useForm()
    
      // Sign up function
      const signUp = async(data) => {
            try {
                  const docRef = await addDoc(collection(db, "patientsData"), data);
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
                  console.log("Document written with ID: ");
            }

          }

      //     Function authentication
          const formAuth = (data) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(user);
                  signUp(data)
                  createdStampTime();
                  setsuccClass('flex');
                  setsuccMsg('Successfully Signed Up');
                  // setparentEle('hidden')
                  
            })
            .catch((error) => {
                  const errorCode = error.code;
                  setparentEle('flex')
                  seterrClass('flex');
                  seterrMsg(errorCode);
            // ..
            });
          }

  return (
    <>
     <div className={loader}></div>
    <main className="text">
      <div className={parentEle}>
            <div className="w-full mx-auto  bg-sky-200  bg-fixed bg-no-repeat  bg-cover  h-screen overflow-hidden scroll-smooth pr-5 pl-5" style={{backgroundImage:`url(${bgimg1})`}}>
                  <div className="flex bg-red-100 mx-auto h-5/6 w-full lg:w-3/5 md:h-auto md:my-20  my-10 rounded-lg overflow-hidden">
                        <div className="text  bg-orange-200 w-full lg:w-1/2 h-full rounded-tl-lg rounded-bl-lg border-r-8 border-r-blue-700">
                              <form className="text px-8" onSubmit={handleSubmit(formAuth)}>
                                    <p className="text-center  py-8 font-mono font-bold text-2xl">For Patients</p>
                                    <div className="text grid gap-5">
                                          <input  type={'text'} {...register("surname", {required: true, minLength:3,  maxLength:20})} placeholder='sur-name' className='border rounded-full py-2 px-4  outline-1 focus:outline-dashed outline-black shadow-inner shadow-gray-500'></input>
                                          <span className="text -translate-y-5">
                                                {errors.surname?.type === "required" && "Pease fill up this field"}
                                                {errors.surname?.type === "minLength" && "Pease input atleast 3 letters"}
                                                {errors.surname?.type === "maxLength" && "The maximum letters is 20"}
                                          </span>
                                          <input type={'text'}  {...register("firstname", {required: true, minLength:3,  maxLength:20})} placeholder='first-name' className='border  -translate-y-5 rounded-full py-2 px-4  outline-1 focus:outline-dashed outline-black shadow-inner shadow-gray-500'></input>
                                          <span className="text -translate-y-10">
                                                {errors.firstname?.type === "required" && "Pease fill up this field"}
                                                {errors.firstname?.type === "minLength" && "Pease input atleast 3 letters"}
                                                {errors.firstname?.type === "maxLength" && "The maximum letters is 20"}
                                          </span>
                                          <input  type={'number'}  {...register("contact", {required: true, minLength:11, maxLength:20})} placeholder='contact' className='border  -translate-y-10 rounded-full py-2 px-4  outline-1 focus:outline-dashed outline-black shadow-inner shadow-gray-500' ></input>
                                          <span className="text -translate-y-14">
                                                {errors.contact?.type === "required" && "Pease fill up this field"}
                                                {errors.contact?.type === "minLength" && "Pease input atleast 11 numbers"}
                                                {errors.contact?.type === "maxLength" && "The maximum number is 20"}      
                                          </span>
                                          <input type={'email'}  {...register("email", {required: true})} placeholder='email' className='border rounded-full py-2 px-4  outline-1 focus:outline-dashed outline-black shadow-inner shadow-gray-500  -translate-y-14'></input>
                                          <span className="text -translate-y-16">
                                                {errors.email?.type === "required" && "Pease input correct email format"}
                                          </span>
                                          <input  type={type}  {...register("password", {required: true,  minLength:6,  maxLength:8})} placeholder='password' className='border rounded-full py-2 px-4  outline-1 focus:outline-dashed outline-black  shadow-inner shadow-gray-500  -translate-y-16'/>
                                                <span onClick={handleAuth} className="text lg:-translate-y-28 -translate-y-28 md:h-9 w-10  relative md:left-96 left-80 md:translate-x-20 translate-x-10 md:text-center  z-10"><Icon icon={icon}/></span>
                                                <span className='-translate-y-32'>
                                                      {errors.password?.type === "required" && "Pease fill up this field"}
                                                      {errors.password?.type === "minLength" && "Pease input atleast 6 digits"}
                                                      {errors.password?.type === "maxLength" && "The maximum digits is 8 "}
                                                </span>
                                                <input  type={'text'}  {...register("address", {required: true, minLength:3,  maxLength:100})} placeholder='address' className='border rounded-full py-2 px-4  outline-1 focus:outline-dashed  -translate-y-32 outline-black shadow-inner shadow-gray-500'/>
                                                      <span className="-translate-y-36">
                                                            {errors.address?.type === "required" && "Pease fill up this field"}
                                                            {errors.address?.type === "minLength" && "Pease input atleast 3 letters"}
                                                            {errors.address?.type === "maxLength" && "The maximum letters is 100"}
                                                      </span>
                                                <input  type={'text'}  {...register("age", {required: true, min:1, max:100})} placeholder='age' className='border rounded-full py-2 px-4  -translate-y-36 outline-1 focus:outline-dashed outline-black  shadow-inner shadow-gray-500'></input>
                                                      <span className="-translate-y-40">
                                                            {errors.age?.type === "required" && "Pease fill up this field"}
                                                            {errors.age?.type === "maxLength" && "The maximum age is 100"}
                                                      </span>
                              
                                                <div className="border bg-white rounded-full py-2 px-2  -translate-y-40 outline-1 focus:outline-dashed outline-black shadow-inner shadow-gray-500">
                                                 <select name="gender" id="cardNo"   {...register(`cardNo`, {required: true})}  className="w-5/6 outline-0 text-gray-500">
                                                      <option value="" className="text  bg-slate-100 text-gray-200" hidden>Auto Generate Card No</option>
                                                      <option value={autoCardNo} className="text  bg-slate-700 text-white">{autoCardNo}</option>
                                                </select>
                                    </div>
                                                <div className="border bg-white rounded-full py-2 px-2  -translate-y-40 outline-1 focus:outline-dashed outline-black shadow-inner shadow-gray-500">
                                                 <select name="gender" id="gender"  {...register("gender", {required: true})} className="w-5/6 outline-0 text-gray-500">
                                                      <option value="" className="text  bg-slate-100 text-gray-200" hidden>gender</option>
                                                      <option value="Male" className="text  bg-slate-700 text-white">Male</option>
                                                      <option value="Female" className="text  bg-slate-700 text-white">Female</option>
                                                      <option value="Others" className="text  bg-slate-700 text-white">Others</option>
                                                </select>
                                    </div>
                                    <span className="text -translate-y-28">
                                          {errors.gender?.type === "required" && "Pease choose gender"}
                                    </span>
                                    </div>
                                    <button className='bg-blue-500 w-1/2 py-1 rounded-full mt-6  -translate-y-44 text-white font-semibold ml-24 hover:scale-105 shadow-md shadow-blue-800' >Sign Up</button>
                                    <p className="text-center mx-auto mt-4 mb-3 md:hidden  -translate-y-44">
                                          Are you a doctor? 
                                          <a href="/docSignUp" className="text-sky-800 underline"> Sign Up</a>
                                    </p>
                              </form>
                              </div>
                              <div className="text  bg-pink-100 w-full lg:w-1/2 hidden md:flex h-auto rounded-tr-lg rounded-br-lg border-l-4 border-l-blue-700">
                                    <img src={formimg} className=' rounded-tr-lg rounded-br-lg ' alt="" />
                                    <button className="text-black bg-white px-10 py-2 rounded-full ml-40 font-bold absolute top-96 hover:scale-110 ease-in-out">
                                    <a href="/docSignUp" className="flex ">
                                          <span className="text"> Sign Up as a Doctor </span>
                                          <FaArrowRight className='mt-1.5 ml-3  animate-spin translate-x-6 ease-in-linear'/>
                                          </a>
                                    </button>
                        </div>
                  </div>
            </div>
      </div>
      <div className={succClass}>
            <div className="text bg-slate-500 shadow-inner shadow-gray-100 drop-shadow-2xl w-4/5 ml-8 lg:w-1/3 h-1/4 absolute lg:top-96 top-80 lg:translate-x-96 lg:ml-72 z-50">
                  <p className="text-center text-white mt-24 text-xl">{succMsg}.</p>
                  <Link to="/login">
                        <button className="text-white font-bold ml-80 mt-16 lg:translate-x-60 text-2xl" onClick={handleSuccess}>Ok</button>
                  </Link>
            </div>
      </div>
      <div className={errClass}>
            <div className="text bg-slate-500 shadow-inner shadow-gray-100 drop-shadow-2xl w-4/5 ml-8 lg:w-1/3 h-1/4 absolute lg:top-96 top-80 lg:translate-x-96 lg:ml-72 z-50">
                  <p className="text-center text-white mt-24 text-xl">{errMsg}.</p>
                        <button className="text-white font-bold ml-80 mt-16 lg:translate-x-60 text-2xl" onClick={handleError}>Ok</button>
            </div>
      </div>
    </main>
  
    </>
  )
}

export default SignUp
