import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
>>>>>>> main-holder
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './auth/useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
<<<<<<< HEAD
);
=======
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );
>>>>>>> main-holder
