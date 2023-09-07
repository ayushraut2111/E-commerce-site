import React,{useState,useEffect} from 'react'
import { GetAccess } from './access'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const data=useSelector((state)=>{
        return state.users
    });
    const [order,setOrder]=useState([])
    const [msg,setMsg]=useState('');
    const navigate=useNavigate();
    const all=async()=>{
        let url="http://127.0.0.1:8000/addorder/"
        let access=await GetAccess(data);
        let resp=await fetch(url,{
            method:"get",
            headers:{
                'Authorization':'Bearer '+ String(access),
            }
        });
        let res=await resp.json();
        console.log(res)
        if(resp.status===401)
        setOrder([])
    else{
        setOrder(res);
    }

    }
    useEffect(()=>{all()},[]);
    const handleReduce=async(id)=>{
        let url=`http://127.0.0.1:8000/addorder/${id}/`
        let access=await GetAccess(data);
        let resp=await fetch(url,{
            method:"delete",
            headers:{
                'Authorization':'Bearer '+ String(access),
               'Content-type': 'application/json',
            },
            body:JSON.stringify({id:id})
        });
        let res=await resp.json();
        all();
        
    }
    const handleIncrease=async(id)=>{
        let url=`http://127.0.0.1:8000/addorder/${id}/`
        let access=await GetAccess(data);
        let resp=await fetch(url,{
            method:"put",
            headers:{
                'Authorization':'Bearer '+ String(access),
               'Content-type': 'application/json',
            },
            body:JSON.stringify({id:id})
        });
        let res=await resp.json();
        all();
    }
    
  return (
    <div className='cart'>
        <div className="carthead">
            <h1>cart</h1>
            <button type='button' onClick={()=>navigate(-1)}>Go Back</button>
            {!order.length&&<h3>cart is empty</h3>}
        </div>
      {
        order.map((ord)=>{
            return(
                <div className="component">
                    <h2>name:-{ord.pname}</h2>
                    <h3>price:-{ord.pprice}</h3>
                    <h3>quantity-{ord.quantity}</h3>
                    <h3>Totalprice:-{ord.totalprice}</h3>
                    <button onClick={()=>handleReduce(ord.id)} type='button'>-</button>
                    <button onClick={()=>handleIncrease(ord.id)} type='button'>+</button>
                </div>
            );
        })
      }
    </div>
  )
}

export default Cart;
