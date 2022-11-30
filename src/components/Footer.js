import React, { useState, useEffect } from 'react';
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaGoogle, FaRegCopyright} from 'react-icons/fa'
// import { Link } from "react-router-dom";
const HomeFooter = () => {
      const [footerHeader, setfooterHeader] = useState("text-white  bg-gray-300  py-5 hidden");
      // const [loader, setloader] = useState("loader22")
      useEffect(() => {
            setfooterHeader("text-white   bg-gray-500  py-5 ");
            // setloader("load");
      }, [])
      
  return (
    <>
    {/* <div className={loader}></div> */}
    <div className={footerHeader}>
            <div className="text flex mx-auto  ">
                  <div className="text  mx-auto">
                        <h6 className="text-center">CONTACTS</h6>
                        <ul className="text">
                              <li className="text my-2">
                                    <a href="https://www.facebook.com/emmanuel.oluwatayese" className="text-white flex">
                                          <FaFacebook className=' mt-1 mr-2 '/>
                                          <span className="text hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Facebook</span>
                                    </a>
                              </li>
                              <li className=" my-2">
                                    <a href="https://www.linkedin.com/in/a-emmanuel-oluwatayese-39254b218" className="text-white flex">
                                          <FaLinkedin className=' mt-1  mr-2'/>
                                         <span className="text hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Linkedin</span> 
                                     </a>
                              </li>
                              <li className=" my-2">
                                    <a href="https://twitter.com/Ultreck1?s=09" className="text-white flex">
                                          <FaTwitter className=' mt-1  mr-2'/>
                                         <span className="tex hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Twitter</span>
                                    </a>
                              </li>
                              <li className=" my-2">
                                    <a href="https://youtube.com/channel/UCO1CNgEARCnuodUuy9JVaAw" className="text-white flex">
                                          <FaYoutube className=' mt-1  mr-2'/>
                                          <span className="text hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Youtube</span>
                                    </a>
                              </li>
                              <li className=" my-2">
                                    <a href="https://www.instagram.com/emmanuel_oluwatayese?r=nametag" className="text-white flex">
                                          <FaInstagram className=' mt-1  mr-2'/>
                                          <span className="text hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Instagram</span>
                                    </a>
                              </li>
                              <li className=" my-2">
                                    <a href="https://wa.me/qr/6VF2TF3N3PN7G1" className="text-white flex">
                                          <FaWhatsapp className=' mt-1  mr-2'/>
                                          <span className="text hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Whatsapp</span> 
                                    </a>
                              </li>
                              <li className=" my-2">
                                    <a href="adetutuemmanueloluwatayese@gmail.com" className="text-white flex">
                                          <FaGoogle className=' mt-1  mr-2'/>
                                          <span className="text hover:underline underline-offset-2 decoration-white-500 hover:scale-110 transition">Gmail</span>
                                    </a>
                              </li>
                        </ul>
                  </div>
                  <div className="text contained mx-auto">
                        <h6 className="text text-center">THE BASICS</h6>
                        <ul className=" ">
                              <li className=" my-2 hover:scale-110 transition">
                                    <a href="##" className="text-white hover:underline underline-offset-2 decoration-white-500">FAQ</a>
                              </li>
                        </ul>
                  </div>
                  <div className="text contained mx-auto">
                        <h6 className="text text-center">GET INVOLVED</h6>
                        <ul className=" ">
                              <li className=" my-2 hover:scale-110 transition">
                                    <a href="##" className="text-white hover:underline underline-offset-2 decoration-white-500">Donation</a>
                              </li>
                              <li className=" my-2 hover:scale-110 transition">
                                    <a href="##" className="text-white hover:underline underline-offset-2 decoration-white-500">Contribution</a>
                              </li>
                        </ul>
                  </div>
            </div>
            <h2 className="text-center flex w-3/4 mt-2 mx-auto">
                  <FaRegCopyright className='mt-1 mr-2'/>
                  <span className="text fs-6 fw-lighter"> 2022 all right reserved by <span className="text-white text-md font-semibold font-serif  underline">WastroTech.</span></span>
            </h2>
    </div>
    </>
  )
}

export default HomeFooter