import React,{useState,useEffect} from 'react'
import { GetAccess } from './access'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Seller = () => {
    const data=useSelector((state)=>{
        return state.users
    });
    // console.log(data)
    const [Product,setProduct]=useState([]);
    const [detail,setDetail]=useState({pname:"",pimage:"",category:"",description:"",price:""});
    const [msg,setMsg]=useState('');
    const navigate=useNavigate();
    // console.log(data)
    const all=async()=>{
        let url="http://127.0.0.1:8000/addproduct/";
        let access=await GetAccess(data);
        // console.log(access);
        let resp=await fetch(url,{
            method:"get",
            headers:{
                'Authorization':'Bearer '+ String(access)
            }
            
        });
        let res=await resp.json();
        // console.log(res);
    }
    useEffect(()=>{all()},[]);
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDetail({...detail,[name]:value})

    }
    console.log(Product)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let url="http://127.0.0.1:8000/addproduct/";
        let access=await GetAccess(data);
        let formdata = new FormData();
        formdata.append('pname',detail.pname);
        formdata.append('pimage',detail.pimage);
        formdata.append('category',detail.category);
        formdata.append('description',detail.description);
        formdata.append('price',detail.price);
        let res=await fetch(url,{
            method:'post',
            headers:{
                'Authorization':'Bearer '+ String(access)
            },body:formdata
        })
        let getmsg=await res.json();
        console.log(getmsg);
        all();
    }

    const handleDelete=async(id)=>{
        console.log(id);
        let url=`http://127.0.0.1:8000/addproduct/${id}/`
        let access=await GetAccess(data);
        let resp=await fetch(url,{
            method:"delete",
            headers:{
                'Authorization':'Bearer '+ String(access),
            },
        });
        all();
    }
    const logout=async ()=>{
        let url='http://127.0.0.1:8000/logout/';
        let f=await fetch(url);
        let resp=await f.json();
        if(f.status===202){
            navigate('/login')
        }
    }
  return (
    <div className='sellermain'>
        <nav className="sellernav">
            <h4>Welcome to the shop</h4>
          <button type='button' onClick={logout}>Log out</button>
        </nav>
        <div className="addproduct">
            <h1 className='reghead'>Add a new item to the shop</h1>
            <form onSubmit={handleSubmit} className='sellerform'>
                <input type="file"  className='sellerimage' onChange={(e)=>setDetail({...detail,pimage:e.target.files[0]})} name='pimage' placeholder='product image' />
                <input type="text"   onChange={handleChange} name='pname' value={detail.pname} placeholder='product name' />
                <input type="text"   onChange={handleChange} name='category' value={detail.category} placeholder='category' />
                <input type="text"   onChange={handleChange} name='description' value={detail.description} placeholder='description' />
                <input type="number" onChange={handleChange} name='price' value={detail.price} placeholder='price' />
                <button type='submit'>Add Product</button>
            </form>
        </div>
        <div className="sellerproduct">
        <div className="products">
        {
            Product.map((prod)=>{
                console.log(prod)
                return(
                    <div className="category">
                        <h2>Category :-{prod.category}</h2>
                        <div className="catprod">
                            {
                                prod.products.map((pds)=>{
                                    let url=`http://127.0.0.1:8000/media/${pds.pimage}`;
                                    // console.log(url)
                                    return(
                                        <div>
                                            <h3>Product name:-{pds.pname}</h3>
                                            <img style={{height:'5cm',width:'5cm'}} src={url} alt='img' />
                                            <h5>price:-{pds.price}</h5>
                                            <h5>description :-{pds.description}</h5>
                                            <button type='button' onClick={()=>handleDelete(pds.id)}>Delete</button>
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
    </div>
  )
}

export default Seller;




// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// function TextLinkExample() {
//   return (
//     <Navbar className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Navbar.Text>
//             Signed in as: <a href="#login">Mark Otto</a>
//           </Navbar.Text>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default TextLinkExample;
