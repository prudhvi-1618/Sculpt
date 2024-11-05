import {React,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN ,USER_ID,USER_NAME} from '../constants';
import api from '../api'
import {jwtDecode} from 'jwt-decode'


const Login = () => {
  const [username,SetUsername]=useState("");
  const [password,SetPassword]=useState("");
  const [error,SetError]=useState("")

  const navigate=useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{const res= await api.post("/api/token/",{username,password});
    if(res.status==200){
      localStorage.setItem(ACCESS_TOKEN,res.data.access);
      localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
      const token = res.data.access ;
      const decoded = jwtDecode(token);
      try{
        let user = await api.get(`/api/user/profile/${decoded.user_id}/`);
        console.log(user);
        localStorage.setItem(USER_ID,user.data.user.id);
        localStorage.setItem(USER_NAME,user.data.user.username);
      }catch(e){
        SetError(e.response);
      }
      navigate("/app")
    }}
    catch(e){
        SetError(e.response.data.detail);
    }
  }
  return (
    <div>
      {error}
        <form onSubmit={handleSubmit} >
            <label htmlFor="name">Username:</label>
            <input type="text" name="name" id="name" onChange={(e)=>SetUsername(e.target.value)} value={username}/>
            {username}
            <br/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="name" id="password" onChange={(e)=>SetPassword(e.target.value)} value={password} />
              <br/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login;