import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addToken } from '../store/slices/userslice';

const Login = () => {
    const [detail,setDetail]=useState({email:"",password:""});
    const [msg,setMsg]=useState('');
    const [detail1,setDetail1]=useState({email:"",password:""});
    const [msg1,setMsg1]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleChange1=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDetail1({...detail1,[name]:value})

    }
    const handleSubmit1=async(e)=>{
        e.preventDefault();
        const data=JSON.stringify(detail1);
        // console.log(data)
        let url="http://127.0.0.1:8000/loginseller/"
        let res=await fetch(url,{
            method:'post',
            headers: {
                'Content-type': 'application/json',
              },
            body:data
        });
        let getmsg=await res.json();    
        // console.log(getmsg);
        if(res.status===202){
        dispatch(addToken(getmsg.token.refresh))
            navigate('/seller');
        }
        setMsg1(getmsg);
    }
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDetail({...detail,[name]:value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data=JSON.stringify(detail);
        // console.log(data)
        let url="http://127.0.0.1:8000/login/"
        let res=await fetch(url,{
            method:'post',
            headers: {
                'Content-type': 'application/json',
              },
            body:data
        });
        let getmsg=await res.json();
        // console.log(getmsg);
        if(res.status===202){
        dispatch(addToken(getmsg.token.refresh))
            navigate('/home');
        }
        setMsg(getmsg);
    }
    const data=useSelector((state)=>{
        return state.users
    })

    // console.log(data)
    // console.log(msg)
  return (
    <div className='login'>
        <div className="loginleft">
        <h1>login as seller</h1>
        <h3>{msg1.msg}</h3>
            <form action="" className="logform" onSubmit={handleSubmit1}>
            <input type="text" onChange={handleChange1} value={detail1.email} name='email' placeholder='Email' className="buyinp" />
            <input type="password" onChange={handleChange1} value={detail1.password} name='password' placeholder='Password' className="buyinp" />
            <br />
            <button type='submit'>Login</button>
            <button onClick={()=>navigate('/signup')}>Signup</button>
            </form>
        </div>
        <div className="loginright">
        <h1>login as buyer</h1>
        <h3>{msg.msg}</h3>
            <form action="" className="logform" onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={detail.email} name='email' placeholder='Email' className="buyinp" />
            <input type="password" onChange={handleChange} value={detail.password} name='password' placeholder='Password' className="buyinp" />
            <br />
            <button type='submit'>Login</button>
            <button onClick={()=>navigate('/signup')}>Signup</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login;
