import React from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' Component={Register}/>
        <Route path='/login' Component={Login}/>
      </Routes>
    </div>
  );
}

export default App;
