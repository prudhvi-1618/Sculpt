import React, { useEffect, useState } from 'react'
import '../styles/ChatFile.css'
import { assets } from '../assets/assets'
import { MdDeleteOutline } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import api from '../api'
import { NavLink } from 'react-router-dom';

const ChatFile = ({ chat }) => {

  const [extended, setExtended] = useState(false);
  const [chatURL, SetChatURL] = useState([]);
  const [active_chatURL, SetactiveChatURL] = useState(null);
  const deleteChat = async (id) => {
    try {
      const res = await api.delete(`/api/chat/detail/${id}/`);
      onSelect(null);
      activateForm(false);
    } catch (e) { console.log(e); }
  }

  const getChatlinks = async (id) => {
    try {
      const res = await api.get(`/api/video_content/${id}/`);
      let urls = []
      res.data.map((item, index) => {
        urls.push(item.url);
      })
      SetChatURL(urls);
      SetactiveChatURL(id);
    } catch (e) { console.log(e); }
  }

  return (
    <div className='sidebar ' style={{ minWidth: !extended ? "6vw" : "19vw" }} >
      <div className="top">

        <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt='' />
        <NavLink to="/app" className="new-chart">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p >New Chat</p> : null}
        </NavLink>
        {extended
          ?
          <div className='recent'>
            <p className="recent-title">Recent</p>
            {chat.map((item, index) => (
              <div key={index} className='w-[20vw] group hover:bg-slate-200 relative  mb-2 rounded-xl  '>
                <div className=" recent-entry " >
                  <NavLink to={`${item.id}/`} className=' w-[16vw]  flex justify-start items-center gap-4 absolute left-0 '>
                    <img src={assets.message_icon} alt="" className='ml-2 ' />
                    <p className="chat  ml-[-15px] h-[5px] pb-[20px] text-ellipsis whitespace-nowrap overflow-hidden ">{item.name}</p>
                    <span
                      className="absolute left-0 bottom-full mb-1 hidden group-hover:flex w-max p-1 bg-white text-gray-700 text-xs rounded shadow-lg"
                    >
                      {item.name}
                    </span>
                  </NavLink>
                  <div className="drop-down flex justify-between items-center p-2 w-[60px] h-[60px] absolute right-[0px] "
                    onClick={() => {
                      active_chatURL != item.id ? getChatlinks(item.id) : SetChatURL([]); SetactiveChatURL(null);
                    }}>
                    <FaChevronDown className='hidden group-hover:block' />
                    <div
                      onClick={
                        () => deleteChat(item.id)
                      }
                      className="delete-button flex justify-center items-center hover:bg-zinc-300 p-2 mt-1 rounded-full ">
                      <MdDeleteOutline className='hidden group-hover:block' />
                    </div>
                  </div>
                </div>
                {item.id == active_chatURL && (<div>
                  {chatURL.map((item, index) => (
                    <div className='group m-2 '>
                      <a className='url w-[100%] h-6 pl-2  rounded-md block bg-[#efefef] text-[black] overflow-hidden text-ellipsis whitespace-nowrap ' href={item} target='_blank'> {item}</a>
                      <div
                        className="absolute left-[20vw] top-[-8vw] p-[4px] mt-2 bg-black hidden group-hover:flex z-50 border border-gray-300 shadow-lg rounded-lg overflow-hidden"
                      >
                        <iframe
                          width="300"
                          height="200"
                          src={`https://www.youtube.com/embed/${item.split('v=')[1]?.split('&')[0]}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>

                  ))}
                </div>)}
              </div>
            ))}

          </div>
          : null}
      </div>
    </div>
  )
}
export default ChatFile;