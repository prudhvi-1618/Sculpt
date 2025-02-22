import { React, useState, useEffect, useRef } from 'react'
import '../styles/Chat.css'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

import api from '../api';
import ChatNav from './ChatNav';

const ChatWindow = () => {

    let [query, Setsearchquery] = useState("");
    let [que, Setquery] = useState(null);
    let [gpt, Setgpt] = useState(null);

    const { chat } = useParams();

    const SubmitQuery = async (e) => {
        e.preventDefault();
        Setgpt("loading.....");
        Setquery(query);
        Setsearchquery("");
        const res = await api.post(`/api/chat/query/${chat}/`, { "query": query })
        const gpt_data = await res.data.gpt;
        Setgpt(gpt_data.substring(8, gpt_data.length - 4));
    };

    return (
        <div className='main '>
            <ChatNav/>
            <div className="chat-memory  h-[76vh] p-2 overflow-y-auto scroll-smooth">
                {query ? <div className="user flex justify-end ">
                    <div className="query max-w-[34vw] bg-[#e9ecef] rounded-xl mx-[12vw] my-2 p-4">
                        {query}
                    </div>
                </div> : <div className="user flex justify-end ">
                    <div className="query max-w-[34vw] bg-[#e9ecef] rounded-xl mx-[12vw] my-2 p-4">
                        {que}
                    </div>
                </div>}
                {gpt ? <div className="model flex justify-start">
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
                </div> : <></>}
            </div>
            <form onSubmit={SubmitQuery}>
                <div className="main-bottom flex justify-center p-3">
                    <div className="search_bar w-[60vw] ">
                        <input type="text" placeholder="Enter a prompt here..." value={query} onChange={(e) => { Setsearchquery(e.target.value) }} />
                        <button type="submit">
                            <img src={assets.send_icon} alt="" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChatWindow;

export const ChatInfoLoader = async () => {
    try {
        const res = await api.get(`/api/video_content/${chat}/`)
        console.log(res.data);
    } catch (e) { console.log(e); }
}