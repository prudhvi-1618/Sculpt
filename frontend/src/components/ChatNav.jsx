import React,{useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets'
import { USER_NAME } from '../constants';

const ChatNav = () => {

    const [showLogout, setShowLogout] = useState(false);    
    const iconRef = useRef(null);
    let username = localStorage.getItem(USER_NAME);
   

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (iconRef.current && !iconRef.current.contains(e.target)) {
                setShowLogout(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);

    }, []);

    return (
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
    )
}

export default ChatNav