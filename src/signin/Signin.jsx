import { useState } from 'react';
import './Signin.css';
import supabase from '../supabaseClient';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

function Signin(){


    const[Title, setTitle] = useState("")
    const[Rating, setRating] = useState("")
    const[Quality, setQuality] = useState("")


async function handlesubmit(e){
    e.preventDefault()
 try {
    const { error } = await supabase.auth.signUp(
        {
            email: Rating,
            password: Quality, 
            options:{
                data:{
                    firstname: Title
                
                }
            }
        }
    )
    if (error) {
      throw error;
    }
    alert("check your email for verification link")
     
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

<div className="middles" > <h1>Sign up</h1></div>

<label for="name"> Username :</label> 
<input type="text" className="inputss" id="name" name="name" placeholder=" 👤 e.g Johnn" onChange={(e)=> setTitle(e.target.value)}  required/> <br/>

<label for="quantity">Password :</label> 
<input type="password" className="inputss" id="quantity" name="quantity" required placeholder=" 🔐 password" onChange={(e)=> setQuality(e.target.value)} /><br/>

<label for="rating">Email :</label> 
<input type="email" className="inputss" id="price" name="price" onChange={(e)=> setRating(e.target.value)} placeholder=" ✉️ email" required/>


<div className="butt">
<button  className="btss"><Button/></button>
</div>
<div className="submitbtn">
Already have an account ? <Link className="signups" to="/Login"> Login</Link>
</div>
</form>


        </div>

  </div>          

    )
}
export default Signin