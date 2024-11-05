import {React,useState,useEffect} from 'react'
import ChatWindow from '../components/ChatWindow.jsx'
import ChatFile from '../components/ChatFile'

import api from "../api"
import { USER_ID,USER_NAME}  from '../constants'

const ChatApp = () => {
  const [selectedChat,setSelectedchat] = useState(null);
  const [chat,setChat]=useState([]);
  const [isactive,activateForm]=useState(false);

  let name=localStorage.getItem(USER_NAME);
  useEffect( ()=>{
    get_chat();
  },[selectedChat]);
  const get_chat= async ()=>{
    let res = await api.get(`/api/chat/${name}/`);
    setChat(res.data);
  }
  
  return (
   <>
    <ChatFile
      chat={chat}
      onSelect={setSelectedchat}
      activateForm={activateForm}
      getChat={get_chat}
    />
    <ChatWindow 
    //sent selected chat
    chat={selectedChat} 
    isactive={isactive} 
    activateForm={activateForm}
    onSelect={setSelectedchat}
    />
   </>
  )
}

export default ChatApp;