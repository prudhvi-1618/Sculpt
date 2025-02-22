import React, { useState, useEffect } from 'react';
import api from '../api';
import { RxCross2 } from "react-icons/rx";
import { USER_NAME } from '../constants';
import '../styles/line-loader.css'
import { useNavigate } from 'react-router-dom';

const LinkUpForm = () => {
    const [inputLink, SetinputLink] = useState("");
    let [links, setLinks] = useState([]);
    let [fetchinglink, SetfetchingLink] = useState(null);

    useEffect(() => {

    }, [links, setLinks])

    const user = localStorage.getItem(USER_NAME);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (links.length > 0) {
            try {
                let chat_resp = await api.post(`api/chat/${user}/`, { "name": "new_chat" });
                for (let i = 0; i < links.length; i++) {
                    SetfetchingLink(i);
                    const scrape_url = await api.post('api/url/scrape/', { "url": links[i] })
                    var chat_title = scrape_url.data.chat_title
                    let content = scrape_url.data.message
                    var title = scrape_url.data.title
                    var error = scrape_url.data.error
                    console.log(scrape_url.data);
                    const content_resp = await api.post(`api/video_content/${chat_resp.data.id}/`, {
                        "url_name": title,
                        "url": links[i],
                        "context": content
                    });
                    SetfetchingLink(null);
                }
                const chat_patch = await api.patch(`api/chat/detail/${chat_resp.data.id}/`, {
                    "id": chat_resp.data.id,
                    "name": chat_title
                });
                useNavigate(`${chat_resp.data.id}/`)
            } catch (e) { console.log(e); }
        }

    }
    const AddData = (e) => {
        e.preventDefault();
        links.push(inputLink);
        setLinks(links);
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
                                <div className='pt-1'>{link}</div>
                                <div
                                    className='p-2 hover:rounded-full hover:bg-slate-200 hover:cursor-pointer '
                                    onClick={() => {
                                        handleDelete(link);
                                    }}
                                >
                                    <RxCross2 />
                                </div>
                            </div>
                            {fetchinglink == index ? <div className="my-[-2px] loader-line"></div> : null}
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