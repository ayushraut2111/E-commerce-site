import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [detail,setDetail]=useState({fullname:"",phone:"",email:"",address:"",password:"",password1:""});
    const [msg,setMsg]=useState('');
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDetail({...detail,[name]:value})

    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const data=JSON.stringify(detail);
        console.log(data)
        let url="http://127.0.0.1:8000/signup/"
        let res=await fetch(url,{
            method:'post',
            headers: {
                'Content-type': 'application/json',
              },
            body:data
        });
        let getmsg=await res.json();
        if(res.status===202){
            navigate('/login');
        }
        setMsg(getmsg.msg[0][0]);

    }
    console.log(msg)
  return (
      <div className='register'>
        <div className="regright">
        <h1>register</h1>
        <h3>{msg}</h3>
      <div className="buyerform">
        <form className='refgorm' onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={detail.fullname} name='fullname' placeholder='FullName' className="buyinp" />
            <input type="text" onChange={handleChange} value={detail.phone} name='phone' placeholder='Phone' className="buyinp" />
            <input type="text" onChange={handleChange} value={detail.email} name='email' placeholder='Email' className="buyinp" />
            <input type="text" onChange={handleChange} value={detail.address} name='address' placeholder='Address' className="buyinp" />
            <input type="password" onChange={handleChange} value={detail.password} name='password' placeholder='Password' className="buyinp" />
            <input type="password" onChange={handleChange} value={detail.password1} name='password1' placeholder='Confirm Password' className="buyinp" />
            <br />
            <button type='submit'>Signup</button>
            <button onClick={()=>navigate('/login')}>Login</button>
        </form>
      </div>
        </div>
    </div>
  )
}

export default Register;
