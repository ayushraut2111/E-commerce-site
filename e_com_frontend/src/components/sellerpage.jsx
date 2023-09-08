import React,{useState,useEffect} from 'react'
import { GetAccess } from './access'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const Seller = () => {
    const data=useSelector((state)=>{
        return state.users
    });
    console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default Seller
