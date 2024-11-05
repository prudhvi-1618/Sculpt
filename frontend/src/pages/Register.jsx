import {React,useState} from 'react'
import { useNavigate ,Link } from "react-router-dom";
import api from '../api'
import '../styles/LoginLogout.css'


import user from '../assets/person.png'
import mailpng from '../assets/email.png'
import passwordpng from '../assets/password.png'

const Register = () => {
  const [username,SetUsername]=useState("");
  const [email,SetEmail]=useState("");
  const [password,SetPassword]=useState("");
  const [error,SetError]=useState("")

  const navigate=useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res= await api.post("/api/user/register/",{username,email,password});
      const res2= await api.post(`/api/create/profile/${res.data.id}/`,{ "profile": null});
      
      navigate('/login');
    }
    catch(e){
      SetError(e.response.data.username);
    }
  }
  return (
    <div className='body' >
        <div>
            <div className='container'>
                <div className='Header'>
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <form className="inputs" onSubmit={handleSubmit} >
                    <div className="input">
                        <img src={user} alt="" />
                        <input type="text" placeholder='User Name' name="name" id="name" onChange={(e)=>SetUsername(e.target.value)} value={username} />
                    </div>
                    <div className="input">
                        <img src={mailpng} alt="" />
                        <input type="email" placeholder='Email Id' name="email" id="email" onChange={(e)=>SetEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="input">
                        <img src={passwordpng} alt="" />
                        <input type="password" placeholder='Password' name="name" id="password" onChange={(e)=>SetPassword(e.target.value)} value={password} />
                    </div>
                {error?  <div className='w-full px-5 py-3 text-[15px] bg-slate-200 rounded-full' >{error}</div> : <div></div> }
                <div className="submit-container">
                  <Link to='/login' className='submit gray' >Sign in</Link>
                  <button type='submit' className="submit" >Sign Up</button>
                </div>
                </form>
                

            </div>
        </div>
    </div>
  )
}

export default Register;