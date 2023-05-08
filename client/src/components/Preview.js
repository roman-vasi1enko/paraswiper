import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  
  function Preview({ videos }) {
<<<<<<< HEAD
    const host = process.env.NODE_ENV === 'production' ? 'https://paraswiper.com' : 'http://localhost:5000';

=======
    // console.log(videos)
>>>>>>> main-holder
    // Run corePyScript
	let navigate = useNavigate();

    const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});
	const [clearMsg, setClearMsg] = React.useState(false);
    const [buttonText, setButtonText] = useState('Analyze comments')
    const [isActive, setActive] = useState(false);

<<<<<<< HEAD
    let commentCount = videos.items[0].statistics.commentCount

=======
>>>>>>> main-holder
    const runPython = async event => {
        event.preventDefault();

        setButtonText('Analyzing, please wait...')
        setActive(true);

        try {
<<<<<<< HEAD
            let response = await axios({
=======
            const response = await axios({
>>>>>>> main-holder
                method: 'POST',
                data: {
                    videoID: videos.items[0],
                },
<<<<<<< HEAD
                url: `${host}/runPython`,
=======
                url: 'http://localhost:5000/runPython',
>>>>>>> main-holder
                withCredentials: true,
            });
            setMsg(
                {
<<<<<<< HEAD
                    text: response.data,
=======
                    text: response.data.message,
>>>>>>> main-holder
                    success: true,
                },
                setClearMsg(!clearMsg)
                );
<<<<<<< HEAD
            let jobId = response.data.id;

            let scriptResult = await axios({
                method: 'POST',
                url: `${host}/runPython/sendResult/${jobId}`,
            });

            while (!Array.isArray(scriptResult.data) || !scriptResult.data === null) {
                scriptResult = await axios({
                    method: 'POST',
                    url: `${host}/runPython/sendResult/${jobId}`,
                })
                await new Promise(resolve => setTimeout(resolve, 2000))
                
            }
            
            if (scriptResult.data === null) {
                alert('Error occured, please try again.')
            }
            else {
                navigate('/results', {
                    state: {
                        videos: videos, 
                        scanResults: scriptResult.data
                    }
                });
            }
            

=======
            // console.log('From Server (react):', response);
            // navigate('/results');
            navigate('/results', {
                state: {
                    videos: videos, 
                    scanResults: response.data
                }
            });

>>>>>>> main-holder

        } catch (err) {
            console.log(err);
            setMsg(
                {
                    text: err.response.data.message,
                    success: false,
                },
                setClearMsg(!clearMsg)
            );
        }
	};

    return (
<<<<<<< HEAD
        <>
            <div className="bg-white py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="chat chat-start flex justify-center">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://emojicdn.elk.sh/🧐" />
                            </div>
                        </div>
                            <div className="chat-bubble"><p>Hey, {videos.items[0].snippet.channelTitle}! It must have been a long way to achieving <strong>{Intl.NumberFormat('en-EN').format(videos.items[0].statistics.viewCount)} views</strong>!</p> <p>Now let's analyze comments and filter spam for you.</p></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 py-10 items-center justify-items-center w-2/3 mx-auto lg:w-4/5">

                        <div className="flex max-w-xs flex-col gap-y-4">
                            <span className="self-start"><a className="font-semibold no-underline hover:underline text-cyan-800 dark:text-cyan-600" href={`https://youtube.com/channel/${videos.items[0].snippet.channelId}`} target="_blank">@{videos.items[0].snippet.channelTitle}</a></span>
                            <dd>
                                <img src={videos.items[0].snippet.thumbnails.medium.url} className="rounded-md shadow-md" />
                            </dd>
                            <dt className="text-base text-gray-800 text-start font-bold">{videos.items[0].snippet.title}</dt>
                        </div>

                        <div className="stats stats-vertical shadow text-center">
    
                            <div className="stat">
                                <div className="stat-title">Views</div>
                                <div className="stat-value">{Intl.NumberFormat('en-EN').format(videos.items[0].statistics.viewCount)}</div>
                            </div>
                            
                            <div className="stat">
                                <div className="stat-title">Comments</div>
                                <div className="stat-value">{Intl.NumberFormat('en-EN').format(videos.items[0].statistics.commentCount)}</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                    
                <button
                    type="submit"
                    onClick={runPython}
                    className={!isActive ? "group mx-auto relative flex w-60 justify-center rounded-md border border-transparent bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" : "btn group mx-auto loading flex w-60 bg-indigo-500 normal-case py-3"}
                    >
                    <span className="absolute inset-y-0 left-2 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                    {buttonText}
                </button> 

                <div className="alert bg-white mx-auto w-60 text-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>It will take ~{commentCount < 1000 ? '1 min' : `${Math.round(commentCount / 1000)} mins`}</span>
                    </div>
                </div>

            </div>
        </>
=======
        <div className="bg-white py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="chat chat-start flex justify-center">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://emojicdn.elk.sh/🧐" />
                        </div>
                    </div>
                        <div className="chat-bubble"><p>Hey, {videos.items[0].snippet.channelTitle}! It must have been a long way to achieving <strong>{Intl.NumberFormat('en-EN').format(videos.items[0].statistics.viewCount)} views</strong>!</p> <p>Now let's analyze comments and filter spam for you.</p></div>
                </div>
                
                <div className="grid grid-cols-1 gap-y-16 text-center lg:grid-cols-2 py-10 items-center justify-items-center w-2/3 mx-auto">

                    <div className="flex max-w-xs flex-col gap-y-4">
                        <span className="self-start"><a className="font-semibold no-underline hover:underline text-cyan-800 dark:text-cyan-600" href={`https://youtube.com/channel/${videos.items[0].snippet.channelId}`} target="_blank">@{videos.items[0].snippet.channelTitle}</a></span>
                        <dd>
                            <img src={videos.items[0].snippet.thumbnails.medium.url} className="rounded-md shadow-md" />
                        </dd>
                        <dt className="text-base text-gray-800 text-start font-bold">{videos.items[0].snippet.title}</dt>
                    </div>

                    <div className="stats stats-vertical shadow">
  
                        <div className="stat">
                            <div className="stat-title">Views</div>
                            <div className="stat-value">{Intl.NumberFormat('en-EN').format(videos.items[0].statistics.viewCount)}</div>
                        </div>
                        
                        <div className="stat">
                            <div className="stat-title">Comments</div>
                            <div className="stat-value">{Intl.NumberFormat('en-EN').format(videos.items[0].statistics.commentCount)}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
                
            <button
                type="submit"
                onClick={runPython}
                className={!isActive ? "group mx-auto relative flex w-60 justify-center rounded-md border border-transparent bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" : "btn group mx-auto loading flex w-60 bg-indigo-500 normal-case py-3"}
                >
                <span className="absolute inset-y-0 left-2 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>
                {buttonText}
            </button> 
        </div>
>>>>>>> main-holder
    )
  }
  
  export default Preview

  