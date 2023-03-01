// import logo from './logo.svg';
// import './App.css';
import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from './auth/RequireAuth';
import Home from './components/Home'
import Login from './components/Login'
import Wizard from './components/Wizard'
import Signup from './components/Signup'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/wizard' element={
					<RequireAuth>
            <Wizard />
					</RequireAuth>
        }
				/>
      </Routes>
    </div>
  );
}

export default App;
