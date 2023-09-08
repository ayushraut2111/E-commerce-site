import React from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Login from './components/Login';
import Home from './components/home';
import Cart from './components/Cart';
import Seller from './components/sellerpage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/home' Component={Home}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/seller' Component={Seller}/>
      </Routes>
    </div>
  );
}

export default App;
