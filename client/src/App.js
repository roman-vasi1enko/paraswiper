import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from './auth/RequireAuth'
import Home from './components/Home'
import Login from './components/Login'
import Wizard from './components/Wizard'
import Signup from './components/Signup'
import Preview from './components/Preview'
import Results from './components/Results'
import FinalScreen from './components/FinalScreen'
import axios from 'axios';

function App() {
  const host = process.env.NODE_ENV === 'production' ? 'https://paraswiper.com' : 'http://localhost:5000';

  let [videos, setVideos] = useState({})

    // Check video views
    const checkVideo = async (videoUrl) => {

      function getIdFromUrl(videoUrl) {
        // Params
          // https://www.youtube.com/watch?v=Ks-_Mh1QhMc
          // https://www.youtube.com/watch?v=Ks-_Mh1QhMc&t=158s
          // https://youtu.be/Ks-_Mh1QhMc
          // https://youtu.be/Ks-_Mh1QhMc?t=159
        if (videoUrl.includes('youtube.com')) {
          return videoUrl.split('?v=')[1].split('').splice(0,11).join('');
        }
        else if (videoUrl.includes('youtu.be')) {
          return videoUrl.split('be/')[1].split('').splice(0,11).join('');
        }
        else {
          return 'dQw4w9WgXcQ';
        }
      }

      const videoInfo = await axios({
        method: 'POST',
        data: {
          videoUrl: getIdFromUrl(videoUrl),
        },
        url: `${host}/getVideoData`,
        withCredentials: true,
      });
      setVideos(videoInfo.data)
    }

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/wizard' element={
					<RequireAuth>
            <Wizard onAdd={checkVideo} />
            {Object.keys(videos).length > 0 && <Preview videos={videos} />}
					</RequireAuth>
        }
				/>
        <Route path='/results' element={ 
          <RequireAuth>
            {<Results videos={videos} />}
          </RequireAuth>
        } 
        />
        <Route path='/completed' element={ 
          <RequireAuth>
            {<FinalScreen videos={videos} />}
          </RequireAuth>
        } 
        />
      </Routes>
    </>
  )
}

export default App;
