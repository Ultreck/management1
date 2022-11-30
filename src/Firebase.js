import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const FirebaseFunct = () => {
  const [name, setname] = useState()
  const [password, setpassword] = useState()
  const [email, setemail] = useState()
  const [allUsers, setallUsers] = useState([{} ])
  
  const firebaseConfig = {
    apiKey: "AIzaSyB_OLJu3kt2t72drO8Yjc4jNQUJBLQf6fc",
    authDomain: "hospital-management-syst-22ba2.firebaseapp.com",
    databaseURL: "https://hospital-management-syst-22ba2-default-rtdb.firebaseio.com",
    projectId: "hospital-management-syst-22ba2",
    storageBucket: "hospital-management-syst-22ba2.appspot.com",
    messagingSenderId: "60319956265",
    appId: "1:60319956265:web:31bc38b1e1d11648754b38",
    measurementId: "G-X6MYJENDHS"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  

  const registerfunct = async() => {
    const newAllUsers = {name, password, email};
      setallUsers([...allUsers, newAllUsers])
    console.log(allUsers);
    try {
      const docRef = await addDoc(collection(db, "doctorsData"), {
        name, 
        password, 
        email
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  // async function getCities(db) {
  //   const citiesCol = collection(db, 'doctorsData');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   console.log(cityList);
  //   return cityList;
  // }
  
  return(
    <>
          <input type="text" onChange={(e) =>setname(e.target.value)} className="text bg-gray-100 mx-1 py-1 rounded-full" />
          <input type="text" onChange={(e) =>setpassword(e.target.value)} className="text bg-gray-100 mx-1 py-1 rounded-full" />
          <input type="text" onChange={(e) =>setemail(e.target.value)} className="text bg-gray-100 mx-1 py-1 rounded-full" />
            <button onClick={registerfunct} className='bg-slate-700 mx-10 px-10 py-2 text-white font-bold rounded-full' >Press</button>
            <button onClick={registerfunct} className='bg-slate-700 mx-10 px-10 py-2 text-white font-bold rounded-full' >Press</button>
    </>
  )
}

export default FirebaseFunct
