import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Actions({ saveSelection, videos }) {
    const [selected, setSelected] = useState('');
    const [error, setError] = useState(false);
    const [copy, setCopy] = useState(false)
    const [collapse, setCollapse] = useState(false)

    const handleSelect = (e) => setSelected(e.target.value)
    const handleError = (e) => setError(!error)
    const handleCollapse = (e) => setCollapse(!collapse)
    const selectedComments = saveSelection();

    const navigate = useNavigate();

    // Google API handler
    const handleClick = async event => {
        
        try {
            if (selected === 'remove') {
                if (selectedComments.length) {
                    const response = await axios({
                        method: 'POST',
                        data: {
                            selectedComments: selectedComments,
                        },
                        url: 'http://localhost:5000/holdForReview',
                        withCredentials: true,
                    });
                    
                    console.log('From Youtube API (delete spam, react):', response);
                    
                    navigate('/completed', {
                        state: {
                            totalProcessed: selectedComments.length,
                            action: 'delete'
                        }
                    });
                }
                else {
                    alert('You didn\'t select any comments. Select at least one and try again.')
                }
            }

            else if (selected === 'report') {
                if (selectedComments.length) {
                    const response = await axios({
                        method: 'POST',
                        data: {
                            selectedComments: selectedComments,
                        },
                        url: 'http://localhost:5000/reportSpam',
                        withCredentials: true,
                    });
                    
                    console.log('From Youtube API (report spam, react):', response);
                    // console.log(selectedComments)
                    navigate('/completed', {
                        state: {
                            totalProcessed: selectedComments.length,
                            action: 'report'
                        }
                    });
                }
                else {
                    alert('You didn\'t select any comments. Select at least one and try again.')
                }
            }
            
        } catch (err) {
            setError(true)
            console.log(err);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText('https://www.youtube.com/channel/UCYtcL_0dKOGsZrKwFubCZ4Q');
        setCopy(!copy)
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <span>Choose an option:</span>
                <select onChange={e => handleSelect(e)} className="select select-primary max-w-xs my-8 ml-2" id="actionSelector" >
                    <option disabled selected>Actions</option>
                    <option value='remove'>Remove Selected</option>
                    <option value='report'>Report Selected</option>
                    {/* <option value='remove&report'>Remove and Report</option> */}
                </select>
                {selected === '' ? <button className="btn btn-disabled ml-5">Swipe 'em!</button> : 
                <button onClick={handleClick} className="btn btn-active btn-primary ml-5">Swipe 'em!</button>}
            </div>
            
            {/* Error popup modal */}
            <input type="checkbox" id="my-modal" className="modal-toggle" checked={error} />
            <div className="modal">
            <div className="modal-box">

                <div className="alert alert-warning shadow-lg mt-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <h2 className="font-bold text-lg">Can't delete without moderator access</h2>
                    </div>
                </div>

                <h3 className="mt-6 mb-2"><strong>If you have access to Youtube Studio:</strong></h3>
                <ol className="list-decimal list-inside pl-4">
                    <li>Visit <a href="https://studio.youtube.com/" target="_blank"><div className="badge badge-primary">Youtube Studio</div></a></li>
                    <li>Go to <strong>"Settings"</strong></li>
                    <li>Click <strong>"Community"</strong> tab</li>
                    <li>Add Paraswiper channel as a Standard moderator:
                        <span className="text-sm">
                        <div className="badge badge-primary badge-outline select-none ml-2"> @paraswiper-mod </div>
                        <div className="badge badge-primary cursor-pointer hover:bg-violet-600 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-300 mr-2" onClick={handleCopy}>
                            {copy ? 'copied' : 'copy'}
                        </div>
                </span>
                    </li>
                    <li className="mt-2">Click <strong>"Save"</strong></li>
                    <li>Close this message and try again.</li>
                </ol>

                <div onClick={handleCollapse} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-4">
                    <input type="checkbox" checked={collapse} />
                    <div className="collapse-title font-bold">
                        What can Standard Moderator do?
                    </div>
                    <div className="collapse-content">
                        <ul className="list-disc list-outside pl-4 text-sm">
                            <li><strong>Review potentially messages</strong>: Put comments on hold for review (YouTube will delete them after 60 days);</li>
                            <li><strong>Hide user from the channel</strong>: User's comments will no longer be visible to other viewers (shadow ban);</li>
                            <li data-outlined="false" class=""><strong>Remove (live chat only)</strong>: Remove any inappropriate or potentially abusive or offensive messages in live chat;</li>
                            <li><strong>Put user in timeout (live chat only)</strong>: Temporarily prevent someone from sending messages in live chat;</li>
                            <li><strong className="text-rose-600">Standard Moderator can't</strong> permanently delete any content (videos, comments, etc.), can't publish new content or comments on behalf of the channel, can't change account settings (e.g. account name, email, password, etc.). It can't do anything else other than listed above.</li>
                            <li className="list-none"><a className="mt-2 inline-block" href="https://support.google.com/youtube/answer/10888907?hl=en&co=GENIE.Platform%3DDesktop" target="_blank"><span className="text-sm link link-primary">Learn more on YouTube help center </span></a></li>
                        </ul>
                    </div>
                </div>
                
                <h3 className="mt-4 mb-2"><strong>If you don't have access to Youtube Studio:</strong></h3>
                <p className="pl-4">You can't delete comments but you can report spam without additional access rights. Close this message and choose "Report selected" action.</p>

                

                <div className="modal-action">
                <label htmlFor="my-modal" className="btn" onClick={handleError} >Close</label>
                </div>
            </div>
            </div>
        </>
    )
}

export default Actions;