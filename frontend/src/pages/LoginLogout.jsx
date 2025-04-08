import {React,useState} from 'react'
import { useNavigate,Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN ,USER_ID,USER_NAME} from '../constants';
import api from '../api'
import {jwtDecode} from 'jwt-decode'
import '../styles/LoginLogout.css'

import user from '../assets/person.png'
import passwordpng from '../assets/password.png'

const LoginLogout = () => {
    const [action, setAction] = useState("Sign In");
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [error, SetError] = useState("")

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/token/", { username, password });
            console.log(res);
            if (res.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                const token = res.data.access;
                const decoded = jwtDecode(token);
                try {
                    let user = await api.get(`/api/user/profile/${decoded.user_id}/`);
                    console.log(user);
                    localStorage.setItem(USER_ID, user.data.user.id);
                    localStorage.setItem(USER_NAME, user.data.user.username);
                } catch (e) {
                    SetError(e.response);
                }
                navigate("/app")
            }
        }
        catch (e) {
            SetError(e.response.data.detail);
        }
    }
    return (
        <div className='body' >
            <div>
                <div className='container sm:w-[500px]'>
                    <div className='Header'>
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <form className="inputs" onSubmit={handleSubmit}>
                        {action === "Sign Up" ? <div></div> : <div className="input">
                            <img src={user} alt="" />
                            <input type="text" placeholder='User Name' name="name" id="name" onChange={(e)=>SetUsername(e.target.value)} value={username}/>
                        </div>}
                        <div className="input">
                            <img src={passwordpng} alt="" />
                            <input type="password" placeholder='Password' name="name" id="password" onChange={(e)=>SetPassword(e.target.value)} value={password} />
                        </div>
                        {error?  <div className='w-full px-5 py-3 text-[15px] bg-slate-200 rounded-full' >{error}</div> : <></> }
                        {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot Password? <span>Click here!</span> </div>}
                        <div className="submit-container">
                            <button type='submit' className="submit" >Sign in</button>
                            <Link to='/register' className='submit gray' >Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginLogout
