import React,{useState,useEffect} from 'react'
import { GetAccess } from './access'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const data=useSelector((state)=>{
        return state.users
    });
    const [product,setProduct]=useState([]);
    const all=async()=>{
        let url="http://127.0.0.1:8000/product/"
        let resp=await fetch(url,{
            method:"get",
        });
        let res=await resp.json();
        setProduct(res);

    }
    const [msg,setMsg]=useState('');
    console.log(product);
    useEffect(()=>{all()},[]);
    const navigate=useNavigate();

    const handleClick=async(id)=>{
        console.log(id);
        const url="http://127.0.0.1:8000/addorder/";
        let access=await GetAccess(data);
        console.log(access)
        let resp=await fetch(url,{
           method:"post",
           headers:{
               'Authorization':'Bearer '+ String(access),
               'Content-type': 'application/json',
           },
           body:JSON.stringify({product:id})
       });
       let res=await resp.json();
       setMsg(res.msg)
    }

  return (
    <div className='home'>
      <div className="navbar">
        <button type='button' onClick={()=>navigate('/cart')}>Cart</button>
        <h3>{msg}</h3>
      </div>
      <div className="products">
        {
            product.map((prod)=>{
                console.log(prod)
                return(
                    <div className="category">
                        <h2>{prod.category}</h2>
                        <div className="catprod">
                            {
                                prod.products.map((pds)=>{
                                    return(
                                        <div>
                                            <h3>{pds.pname}</h3>
                                            <h5>{pds.price}</h5>
                                            <h5>{pds.description}</h5>
                                            <h5>{pds.seller_name}</h5>
                                            <button type='button' onClick={()=>handleClick(pds.id)}>Add to cart</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Home
