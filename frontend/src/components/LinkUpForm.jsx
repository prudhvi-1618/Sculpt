import React, { useState, useEffect } from 'react';
import api from '../api';
import { RxCross2 } from "react-icons/rx";
import { USER_NAME } from '../constants';
import '../styles/line-loader.css'
import { useNavigate } from 'react-router-dom';

const LinkUpForm = () => {
    const [inputLink, SetinputLink] = useState("");
    let [links, setLinks] = useState([]);
    const [chat_titles,SetChatTitle] =  useState("");
    const navigate = useNavigate();

    useEffect(() => {

    }, [links, setLinks])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (links.length > 0) {
            try {
                const content_resp = await api.post(`api/video_content/`, {
                    "chat_titles": chat_titles,
                    "videos": links,
                });
                const chat = await content_resp.data.chat.id;
                navigate(`${chat}/`)
            } catch (e) { console.log(e); }
        }

    }
    const AddData = async (e) => {
        e.preventDefault();
        const scrape_url = await api.post('api/url/scrape/', { "url": inputLink});
        var chat_title = scrape_url.data.chat_title;
        let content = scrape_url.data.message;
        var title = scrape_url.data.title;
        // var error = scrape_url.data.error
        let video_content =  {
            "url_name": title,
            "url": inputLink,
            "context": content
        }
        links.push(video_content);
        setLinks(links);
        SetChatTitle(chat_titles+" -> "+chat_title);
        SetinputLink("");
    }
    const handleDelete = (link) => {
        const k = links.filter(li => li != link);
        setLinks(k);
    }
    return (
        <div className='flex flex-col gap-8  '>
            <div className='flex justify-start items-center'>
                <form onSubmit={AddData}>
                    <label htmlFor="" className='text-7xl'>Start the Exploration <br /> Share Your YouTube Clip</label>
                    <br />
                    <input type="text" className=' mt-10 w-[50vw] h-9 border-2 border-black' value={inputLink} onChange={(e) => SetinputLink(e.target.value)} />
                    <input type='submit' value='Add' className='m-2 py-2 px-4 font-semibold border-2 border-zinc-800 rounded-full cursor-pointer hover:bg-zinc-900 hover:text-zinc-100' />
                </form>
            </div>
            <div>
                {links.map((link, index) => {
                    return (
                        <div key={index} className='my-2 w-[50vw]'>
                            <div className=' bg-slate-100  rounded-md px-5 py-2 flex justify-between  font-sans text-zinc-900' >
                                <div className='pt-1'>{link.url_name}</div>
                                <div
                                    className='p-2 hover:rounded-full hover:bg-slate-200 hover:cursor-pointer '
                                    onClick={() => {
                                        handleDelete(link);
                                    }}
                                >
                                    <RxCross2 />
                                </div>
                            </div>
                            {/* {fetchinglink == link.url ? <div className="my-[-2px] loader-line"></div> : null} */}
                        </div>
                    )
                })}
            </div>
            <div className=' mx-[25vw] flex  '>
                {links.length != 0 ? <div
                    onClick={handleSubmit}
                    className='py-2 px-4 font-semibold border-2 border-zinc-800 rounded-full cursor-pointer hover:bg-zinc-900 hover:text-zinc-100'>Submit</div> : <></>}
            </div>
        </div>

    )
}

export default LinkUpForm;