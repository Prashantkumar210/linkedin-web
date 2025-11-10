import React, { useContext } from 'react'
import logo from '../assets/logo.svg'
import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import dp from '../assets/dp.webp'
import { useState } from 'react';
import {userDataContext} from '../context/UserContext'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';
function Nav() {

    let [activeSearch, setActiveSearch] = useState(false)
    let {userData, setUserData} = useContext(userDataContext);
    let [showPopup, setShowpopup] = useState(false)
    let navigate = useNavigate()
    // Handle signout 
      let {serverUrl} = useContext(authDataContext)
      const handleSignOut = async ()=>{
        try {
          let result = await axios.get(serverUrl+"/api/auth/logout", {withCredentials:true})
          setUserData(null)
          navigate("/login")
          console.log(result)
        
        } catch (error) {
          console.log(error)
        }
      }




  return (
    <div className='w-full h-[80px] bg-[white] fixed top-0 shadow-lg flex justify-between md:justify-around items-center px-[10px] left-0 z-[50]'>
        
    {/* Left Section - Logo & Search */}
    <div className='flex justify-center items-center gap-[10px]'>
        <div onClick={()=>{
          setActiveSearch(false)
        }}>
        <img src={logo} alt = "" className='w-[100px]' />
      </div>
        
    {/* Mobile Search Icon */}

      {!activeSearch && <div><CiSearch className='w-[23px] h-[23px] text-gray-700 lg:hidden' onClick={()=>setActiveSearch(true)}/></div>}
    
    {/* Desktop Search Bar */}
      <form className={`w-[190px] lg:w-[350px] h-[40px] bg-[#edede9] lg:flex items-center gap[10px] py-[10px] rounded-md ${!activeSearch?"hidden":"flex"}`}>
        <div><CiSearch className='w-[23px] h-[23px] text-gray-700' /></div>
        <input type="text" className='w-[80%] h-full bg-transparent outline-none border-0' placeholder='search users...'/>
      </form>
    </div>


     {/* Right Section - Nav Icons */}
    <div className='flex justify-center items-center gap-[20px] relative'>

      {showPopup &&  <div className='w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg flex flex-col items-center p-[20px] gap-[20px]'>
          
          <div className='w-[70px] h-[70px] rounded-full overflow-hidden cursor-pointer'>
            <img src={dp} alt="" className='w-full h-full' />
          </div>

          <div className='text-[18px] font-semibold text-gray-700'>{`${userData.firstName} ${userData.lastName} `}</div>
          <button className='w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff]'>View Profile</button>
          <div className='w-full h-[1px] bg-gray-700'></div>

          <div className='flex w-full items-center justify-start text-gray-700 gap-[20px]'>
            <FaUsers className='w-[23px] h-[23px] text-gray-800' />
            <div> My Network</div>
          </div>
          <button className='w-[100%] h-[40px] rounded-full border-2 border-[#dd3b3b] text-[#dd3b3b]' onClick={handleSignOut}>Sign Out</button>

      </div>} 
    

        <div className='lg:flex flex-col items-center justify-center text-gray-700 hidden'>
            <FaHome className='w-[23px] h-[23px] text-gray-800'/>
            <div>Home</div>
        </div>
        <div className='md:flex flex-col items-center justify-center text-gray-700 hidden'>
            <FaUsers className='w-[23px] h-[23px] text-gray-800' />
            <div> My Network</div>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <IoIosNotifications className='w-[23px] h-[23px] text-gray-800' />
            <div className='hidden md:block'>Notification</div>
        </div>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer ' onClick={()=>setShowpopup(prev=>!prev)} >
            <img src={dp} alt="" />
        </div>
    </div>
    </div>
  )
}

export default Nav
