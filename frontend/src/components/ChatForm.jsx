import React,{useState,useRef} from 'react'
import LinkUpForm from './LinkUpForm'
import '../styles/Chat.css'
import { assets } from '../assets/assets'
import api from '../api';
import { USER_NAME } from '../constants';
import { Link } from 'react-router-dom';
import ChatNav from './ChatNav';



const ChatForm = () => {



    const [showLogout, setShowLogout] = useState(false);
    const iconRef = useRef(null);
    const [isActive,activateForm] = useState(false);
    let username = localStorage.getItem(USER_NAME);
    
    
    return (
        <div className='main'>
            <ChatNav/>
            <div className="main_container ">
                 {isActive?<LinkUpForm  /> :
                    <div
                        className="wish md:text-8xl sm:text-6xl text-2xl tracking-tight font-semibold uppercase flex flex-col  justify-end ">
                        <p>Every Creation has a story.</p>
                        <p> Begin exploring its  </p>
                        <p>unique tale!</p>
                         <div onClick={() => { activateForm(true) }}
                            className="button mt-14 group w-48 text-[18px] font-semibold flex justify-evenly items-center py-2 px-4 border-2 border-zinc-700 rounded-3xl hover:bg-zinc-900 hover:text-zinc-300 cursor-pointer ">
                            Link Up Video
                            <div className="circle ml-7 bg-zinc-600 w-4 h-4 group-hover:bg-zinc-100 rounded-full cursor-pointer "></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatForm;