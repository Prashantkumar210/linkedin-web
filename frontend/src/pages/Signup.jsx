import React, { useContext, useState } from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { userDataContext } from '../context/UserContext'


function Signup() {

  let [show, setShow] = useState(false)

  // when we want to access the context api(here Backend localhost:8000) then we use Usecontext hook
  let {serverUrl} = useContext(authDataContext)
  
  let {userData, setUserData} = useContext(userDataContext)

  let navigate = useNavigate()

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("")




  const handleSignUp = async(e)=>{

    // So that page is not refresh we use e.preventDefault
    e.preventDefault()
    setLoading(true);
    try {
      let result = await axios.post(serverUrl+"/api/auth/signup", {
          firstName,
          lastName,
          userName,
          email,
          password
      }, {withCredentials:true})
      // after come of the responce 
      console.log(result)
      setUserData(result.data)
      navigate("/")     
      setErr("")
      setLoading(false)
      setFirstName("")
      setLastName("")
      setUserName("")
      setEmail("")
      setPassword("")

    } catch (error) {
      console.log(error)
      setErr(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start gap-[10px]'> 
        <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex items-center'>
            <img src={logo} alt="" />
        </div>

        <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center  gap-[15px] p-[15px]' onSubmit={handleSignUp}>
          <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Sign Up</h1>
          <input type="text" placeholder='firstname' required className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <input type="text" placeholder='lastname' required className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          <input type="text" placeholder='username' required className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          <input type="email" placeholder='email' required className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          
          <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px]  rounded-md overflow-hidden relative'>
            <input type={show ? "text":"password"} placeholder='password' required className='w-full h-full border-none text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <span className='absolute right-[20px] top-2 cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{show ? "hidden" : "show"}</span>
          </div>


          {err && <p className='text-center text-red-700'>
              *{err}
            </p>}

          <button className='w-[100%] h-[50px] rounded-md bg-[#1dc9fd] mt-[40px]' disabled={loading}>{loading? "Loading...": "Sign Up"}</button>

          <p className='text-center cursor-pointer' onClick={()=>navigate("/login")}>Already have an account ? <span className='text-[#157cbc]'>Sign In</span></p>

        </form>
    </div>
  )
}

export default Signup
