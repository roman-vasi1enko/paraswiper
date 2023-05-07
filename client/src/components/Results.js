import { redirect, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Table from './Table';


function Results({ videos }) {
  let navigate = useNavigate();
  const location = useLocation();

  window.onbeforeunload = function() {
    return "Error";
  };

  try {
    let scanResults = location.state.scanResults;

    let totalComments = videos.items[0].statistics.commentCount;
    let totalSpam = scanResults[2].spamCommentsCount;

    let countAnalyzed = scanResults[2].scannedCommentsCount + scanResults[2].scannedRepliesCount;
    let analyzedRate = Math.round(countAnalyzed / totalComments * 100);
    let spamRate = totalSpam / countAnalyzed * 100;

    // remove duplicates from spam comments
    // let uniqueComments = [...new Map(spamComment.map(v => [v.authorID + '|' + v.text, v])).values()];

    return (
      <>

        <ul className="steps py-10 flex justify-center">
          <li className="step w-40">Choose Video</li>
          <li className="step w-40 step-primary">Analyze & Review</li>
          <li className="step w-40">Swipe Spam</li>
        </ul>

        <div className="flex justify-center items-center gap-10 my-8">
        
          <div className="card card-compact w-96 h-72 bg-base-100 shadow-xl">
            <figure><img src={videos.items[0].snippet.thumbnails.standard.url} alt="Video Thumbnail" /></figure>
            <div className="card-body flex-row">
              {/* <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <img src={videos.items[0].snippet} alt="Author Channel Image" />
                </div>
              </div>  */}
              <h2 className="card-title text-base leading-5">{videos.items[0].snippet.title}</h2>
            </div>
          </div>

          <div className="w-min">
            <div className="stats shadow my-3">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>

                </div>
                <div className="stat-title">All comments</div>
                <div className="stat-value text-3xl">{Intl.NumberFormat('en-EN').format(totalComments)}</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>

                </div>
                <div className="stat-title">Analyzed</div>
                <div className="stat-value text-3xl">{totalComments > 0 ? `${analyzedRate <= 100 ? analyzedRate : 100}%` : '–'}</div>
              </div>
            </div>

            
            <div className="stats shadow my-3 w-full">
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>

                </div>
                <div className="stat-title">Spam filtered</div>
                <div className="stat-value text-3xl">{Intl.NumberFormat('en-EN').format(totalSpam)}</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>

                </div>
                <div className="stat-title">Spam rate</div>
                <div className="stat-value text-3xl">{totalComments > 0 ? `${spamRate.toFixed(1)}%` : '–'}</div>
              </div>
            </div>

          </div>
        </div>

        <Table scanResults={scanResults} videos={videos}/>
      </>
    )
  } catch (error) {
      console.log(`Error: ${error}`);
      function handleClick() {
        navigate('/wizard')
      }
      return (
        <>
          <div className="alert alert-error shadow-lg w-2/4 mx-auto mt-8">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Sorry, something went wrong. Please, try again.</span>
            </div>
          <button onClick={handleClick} className="btn btn-outline">Try again</button>
          </div>
        </>
    )
  }
}
  
  export default Results;