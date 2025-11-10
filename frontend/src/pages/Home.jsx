import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import dp from '../assets/dp.webp'
import { HiOutlinePlus } from "react-icons/hi";
import { FiCamera } from "react-icons/fi";
import { userDataContext } from '../context/UserContext';
import { MdOutlineModeEdit } from "react-icons/md";
import EditProfile from '../components/EditProfile';


function Home() {

  let {userData,setUserData, edit, setEdit} = useContext(userDataContext)
  

  return (
    <div className='w-full min-h-[100vh]  pt-[100px] bg-[#f0efe7] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row'>
      {edit &&  <EditProfile/>}
     
      <Nav/>
      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg rounded-lg p-[10px] relative'>
        <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex items-center justify-center relative cursor-pointer'  onClick={()=>setEdit(true)}>
          <img src="" alt="" className='w-full'/>
          <FiCamera className='absolute right-[20px] top-[20px] w-[20px] text-gray-800 cursor-pointer'/>
        </div>
         <div className='w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center cursor-pointer absolute top-[78px] left-[24px]'  onClick={()=>setEdit(true)}>
            <img src={dp} alt="" className='h-full' />
          </div>
          <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[108px] left-[81px] rounded-full flex justify-center items-center cursor-pointer'>
              <HiOutlinePlus  />
          </div>


          <div className=' mt-[40px] text-[16px] font-semibold text-gray-700'>
            <div>{`${userData.firstName} ${userData.lastName}`}</div>
            <div className='text-[19px] font-semibold text-gray-700'>{userData.headline || ""}</div>
            <div className='text-[16px] text-gray-500'>{`${userData.location}`}</div>
          </div>
            <button className=' flex justify-center items-center gap-[20px] w-[100%] h-[40px] rounded-full border-2 border-[#2dc0ff] text-[#2dc0ff] my-[20px]' onClick={()=>setEdit(true)}>Edit Profile <MdOutlineModeEdit /></button>
      </div>
      <div className=' w-full lg:w-[50%] min-h-[200px] bg-[white] shadow-lg'>

      </div>
      <div className=' w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg'>

      </div>
    </div>
  )
}

export default Home
