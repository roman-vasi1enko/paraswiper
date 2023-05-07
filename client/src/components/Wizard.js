import { useState } from 'react'

function Wizard({ onAdd }) {
  const [videoUrl, setVideoUrl] = useState('');

  const onSubmit = (e) => {

    e.preventDefault()

        if (!videoUrl) {
            alert('Please add video URL');
            return;
        }

        onAdd( videoUrl );
  }

    return (
      <>
        <div className="bg-gray-100 p-10">
          <div className="w-3/5 mx-auto">

            <ul className="steps pb-10 flex justify-center">
              <li className="step w-40 step-primary">Choose Video</li>
              <li className="step w-40">Analyze & Review</li>
              <li className="step w-40">Swipe Spam</li>
            </ul>
            
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={onSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-4 sm:col-span-3">
                        <label htmlFor="youtube-video" className="block text-sm font-medium text-gray-700">
                        Choose a video from Youtube and paste its link below:
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            Link:
                          </span>
                          <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            name="videoUrl"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                            placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
                          />
                        </div>
                      </div>
                    </div>
  
                    
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        
      </>
    )
  }
  
  export default Wizard;