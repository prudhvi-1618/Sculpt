import { React, useState, useEffect } from 'react'
import ChatFile from '../components/ChatFile'
import { Outlet } from 'react-router-dom'

import api from "../api"
import { USER_ID, USER_NAME } from '../constants'

const ChatApp = () => {
  const [chat, setChat] = useState([]);

  let name = localStorage.getItem(USER_NAME);
  useEffect(() => {
    get_chat();
  }, []);
  const get_chat = async () => {
    let res = await api.get(`/api/chat/${name}/`);
    setChat(res.data);
  }

  return (
    <>
      <ChatFile chat={chat} />
      <Outlet />
    </>
  )
}

export default ChatApp;