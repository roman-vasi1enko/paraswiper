// import logo from './logo.svg';
// import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import Wizard from "./components/Wizard";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/wizard' element={ <Wizard /> } />
      </Routes>
    </div>
  );
}

export default App;
