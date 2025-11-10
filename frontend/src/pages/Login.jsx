import React, { useContext, useState } from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"
import { userDataContext } from '../context/UserContext'


function Login() {

  let [show, setShow] = useState(false)

  // when we want to access the context api then we use Usecontext hook

  let {serverUrl} = useContext(authDataContext)

  let {userData, setUserData} = useContext(userDataContext)

  let navigate = useNavigate()

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("")



  const handleSignIn = async(e)=>{

    // So that page is not refresh we use e.preventDefault
    e.preventDefault()
    setLoading(true);
    try {
      let result = await axios.post(serverUrl+"/api/auth/login", {
          email,
          password
      }, {withCredentials:true})
      // after come of the responce 
      setUserData(result.data)
      navigate("/")
      setErr("")
      setLoading(false)
      setEmail("")
      setPassword("")

    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start gap-[10px]'> 
        <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex items-center'>
            <img src={logo} alt="" />
        </div>

        <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col justify-center  gap-[15px] p-[15px]' onSubmit={handleSignIn}>
          <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Sign In</h1>
          
          <input type="email" placeholder='email' required className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          
          <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px]  rounded-md overflow-hidden relative'>
            <input type={show ? "text":"password"} placeholder='password' required className='w-full h-full border-none text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <span className='absolute right-[20px] top-2 cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{show ? "hidden" : "show"}</span>
          </div>


          {err && <p className='text-center text-red-700'>
              *{err}
            </p>}

          <button className='w-[100%] h-[50px] rounded-md bg-[#1dc9fd] mt-[40px]' disabled={loading}>{loading? "Loading...": "Sign In"}</button>

          <p className='text-center cursor-pointer' onClick={()=>navigate("/signup")}>Want to craete a new account ?<span className='text-[#157cbc]'>Sign Up</span></p>

        </form>
    </div>
  )
}

export default Login
