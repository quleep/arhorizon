import axios from "axios";

const verifyurl = 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/verifytokenarhorizon'

export function getUser() {
    const user = sessionStorage.getItem('user');
    if (user === undefined || !user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }
  
  export function getToken() {
    return sessionStorage.getItem('token');
  }
  
  export function setUserSession(user, token) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
  }
  export async function verifyToken(email, token){
      const body= {
        email: email,
        token: token
      }
      return  await axios.post(verifyurl, body).then(res=>{
      

       if(res.data.verified === true){
        return true
       }else{
        return false
       }
        
      }).catch(error=>{
        console.log(error)
      })
  }


