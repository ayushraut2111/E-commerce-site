import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [detail,setDetail]=useState({email:"",password:""});
    const [msg,setMsg]=useState('');
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDetail({...detail,[name]:value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data=JSON.stringify(detail);
        console.log(data)
        let url="http://127.0.0.1:8000/login/"
        let res=await fetch(url,{
            method:'post',
            headers: {
                'Content-type': 'application/json',
              },
            body:data
        });
        let getmsg=await res.json();
        // if(res.status===202){
        //     navigate('/login');
        // }
        setMsg(getmsg);
    }
    console.log(msg)
  return (
    <div className='login'>
        <h1>login</h1>
        <h3>{msg.msg}</h3>
        <div className="loginright">
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
