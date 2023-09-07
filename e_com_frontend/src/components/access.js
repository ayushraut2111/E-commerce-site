
export const GetAccess= async(data)=>{
    const dta=JSON.stringify(data)
    const tknurl="http://127.0.0.1:8000/api/token/refresh/";
    let resf=await fetch(tknurl,{
        method:"post",
        headers: {
            'Content-type': 'application/json',
          },
          body:dta
        });
        let resp=await resf.json();
        let accesstoken=resp.access;
        return accesstoken;

}