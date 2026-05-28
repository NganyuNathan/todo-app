import { useState } from 'react';
import './Signin.css';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Button from '../button/Button';
// import Alarm from '../context/AlarmContext';

function Login({setToken}){

    const navigate = useNavigate()


    // const[Title, setTitle] = useState("")
    const[Rating, setRating] = useState("")
    const[Quality, setQuality] = useState("")


async function handlesubmit(e){
    e.preventDefault()
 try {
    const{data, error} = await supabase.auth.signInWithPassword({
        email: Rating,
        password: Quality,
    })
    if(error) throw error
    console.log(data)
    setToken(data)
    navigate("/home")
  
     
 } catch (error) {
     alert(error)
     console.log(error)
     
     
 }

}
   

    return(
        <div>
        <div className="heads">
        <img src="tods.png" alt=""/>  
     </div> 
        <div className="formlogs">
  



          
          <form onSubmit={handlesubmit} className="formss">

<div className="middles" > <h1>Log in</h1></div>
{/* 
<label for="name"> Email :</label> 
<input type="email" className="inputss" id="name" name="name" onChange={(e)=> setRating(e.target.value)} placeholder="email" required/> <br/>    */}


<label for="rating">Email :</label> 
<input type="text" className="inputss" id="price" name="price" onChange={(e)=> setRating(e.target.value)} placeholder=" ✉️ email" required/><br/>

<label for="quantity">Password :</label> 
<input type="password" className="inputss" id="quantity" name="quantity" required placeholder= " 🔐 password" onChange={(e)=> setQuality(e.target.value)} />

<div className="checkbox">
 <input type="checkbox"  /> remember me 
</div>



<div className="butt">

<button  className="btss"><Button /></button>

</div>

 <div className="submitbtn">
 Dont have an account? <Link className="signups" to="/signup" >Signup</Link>
     </div> 

</form>


        </div>
{/* <Alarm/> */}
        </div>

    )
}
export default Login

// function Login(){
//     return(
//         <div>Login</div>
//     )
// }
// export default Login