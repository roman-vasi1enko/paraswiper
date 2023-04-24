// import logo from './logo.svg';
// import './App.css';
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
import { YOUTUBE_API } from './config'

function App() {
  let [videos, setVideos] = useState({})
  // let videos = {};

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

      const videoInfoAPI = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${getIdFromUrl(videoUrl)}&key=${YOUTUBE_API}`

      let data = await fetch(videoInfoAPI)
          .then(res => res.json())
          .catch(err => {
              console.log(`error ${err}`)
          });

      setVideos(data)

      console.log(Object.keys(videos).length)
      
    }

  return (
    <div>
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
    </div>
  );
}

export default App;
