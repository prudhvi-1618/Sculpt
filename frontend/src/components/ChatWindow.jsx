import { React, useState, useEffect, useRef } from 'react'
import '../styles/Chat.css'
import { assets } from '../assets/assets'
import LinkUpForm from './LinkUpForm'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import api from '../api';
import { USER_NAME } from '../constants';

const ChatWindow = ({ chat, isactive, activateForm, onSelect }) => {

    let [query, Setsearchquery] = useState(null);
    let [que,Setquery] = useState(null);
    let [gpt, Setgpt] = useState(null);
    let username = localStorage.getItem(USER_NAME);
    const [showLogout, setShowLogout] = useState(false);
    const iconRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (iconRef.current && !iconRef.current.contains(e.target)) {
                setShowLogout(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);

    }, []);

    useEffect(()=>{

        const chat_details = async () => {
            try {
                const res = await api.get(`/api/video_content/${chat}/`)
                console.log(res.data);
            } catch (e) { console.log(e); }
        }

        if(chat) chat_details();

    },[chat]);

    

    if (chat != null) {

        const SubmitQuery = async (e) => {
            e.preventDefault();
            Setgpt("loading.....");
            Setquery(query);
            Setsearchquery("");
            const res = await api.post(`/api/chat/query/${chat}/`, { "query": query })
            console.log(res.data);
            Setgpt(res.data.gpt);
        };
        
        return (
            <div className='main '>
                <div className='nav'>
                    <h1>Sculpt </h1>
                    <div className="cursor-pointer  relative"
                        onClick={() => setShowLogout(!showLogout)}
                        ref={iconRef}
                    >
                        <img src={assets.user_icon} alt="" />
                        <div className={`absolute right-[3vw] min-w-[15vw]  border text-white bg-black p-3 rounded-md  ${showLogout ? 'opacity-100' : 'opacity-0 invisible'} `}>
                            <div className='text-[1.5vw] capitalize block' >Hii , {username}</div>
                            <Link
                                to='/logout'
                                className="text-[1.4vw] font-medium capitalize transition-opacity duration-300 border bg-black  hover:text-black hover:bg-white px-3 py-1 rounded-full "
                                onClick={(e) => e.stopPropagation()}
                            >
                                log out
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="chat-memory  h-[76vh] p-2 overflow-y-auto scroll-smooth">
                    {query?<div className="user flex justify-end ">
                        <div className="query max-w-[34vw] bg-[#e9ecef] rounded-xl mx-[12vw] my-2 p-4">
                            {query}
                        </div>
                    </div>:<div className="user flex justify-end ">
                        <div className="query max-w-[34vw] bg-[#e9ecef] rounded-xl mx-[12vw] my-2 p-4">
                            {que}
                        </div>
                    </div>}
                    {gpt?<div className="model flex justify-start">
                        <div className="gpt bg-[#e9ecef] max-w-[50vw]  rounded-xl mx-[12vw] my-2 p-4">
                            {/* <ReactMarkdown>{gpt}</ReactMarkdown> */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                dangerouslySetInnerHTML={{ __html: gpt }}
                            />
                            {/* <div dangerouslySetInnerHTML={{ __html: gpt }} /> */}
                        </div>
                    </div>:<></>}

                </div>
                <form onSubmit={SubmitQuery}>
                    <div className="main-bottom flex justify-center p-3">
                        <div className="search_bar w-[60vw] ">
                            <input type="text" placeholder="Enter a prompt here..." value={query} onChange={(e) => { Setsearchquery(e.target.value) }} />
                            <submit>
                                <img src={assets.send_icon} alt="" />
                            </submit>
                        </div>
                    </div>
                </form>
            </div>
        )
    }



    return (
        <div className='main'>
            <div className='nav'>
                <h1>Sculpt </h1>
                <div className="cursor-pointer  relative"
                    onClick={() => setShowLogout(!showLogout)}
                    ref={iconRef}
                >
                    <img src={assets.user_icon} alt="" />
                    <div className={`absolute right-[3vw] min-w-[15vw] text-white border bg-zinc-900 p-3 rounded-md  ${showLogout ? 'opacity-100' : 'opacity-0 invisible'} `}>
                        <div className='text-[1.5vw] capitalize block' >Hii , {username}</div>
                        <Link
                            to='/logout'
                            className="text-[1.4vw] font-medium capitalize transition-opacity duration-300 border border-white  hover:text-black hover:bg-white px-3 py-1 rounded-full "
                            onClick={(e) => e.stopPropagation()}
                        >
                            log out
                        </Link>
                    </div>
                </div>
                {/* <Link to='/login' className="cursor-pointer" >
                <img src={assets.user_icon} alt=""  />
            </Link> */}
            </div>
            <div className="main_container ">
                {(isactive) ? <LinkUpForm onSelect={onSelect} /> :
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

export default ChatWindow;