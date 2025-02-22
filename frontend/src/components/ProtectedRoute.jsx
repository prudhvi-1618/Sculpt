import {React,useEffect,useState} from 'react'
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constants'
import api from '../api.js'

const ProtectedRoute = ({children}) => {
    const [isAuthenticated,SetIsAuthorized]=useState(null);
    useEffect(()=>{
        auth().catch(() => SetIsAuthorized(false))
    },[])

    const refresh = async ()=>{
        try{
            const refresh_token=localStorage.getItem(REFRESH_TOKEN);
            const res= await api.post("api/token/refresh/",{
                refresh:refresh_token
            })
            if(res.status==200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                SetIsAuthorized(true);
            }else{
                SetIsAuthorized(false);
            }
        }catch(error){
            console.log(error);
            SetIsAuthorized(false);
        }
    }
    const auth = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            SetIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const expiration = decoded.exp;
        const now = Date.now()/1000;
        if(expiration<now){
            await refresh();
        }else{
            SetIsAuthorized(true);
        }
    }
    if(isAuthenticated==null) return <div>loading....</div>

    return isAuthenticated? children : <Navigate to="/login" />
}

export default ProtectedRoute
