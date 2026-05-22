import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import supabase from "../supabaseClient"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Update.css';

function Update(){

    const {id} = useParams()
    const navigate = useNavigate()


const[Title, setTitle] = useState("")
const[Method, setMethod] = useState("")
const[Rating, setRating] = useState("")
const[Quality, setQuality] = useState("")
const[time, setDate] = useState("")
const[formError, setFormError] = useState("")


const handlesubmit = async (e) => {
    e.preventDefault()

 
if(!Title || !Method || !Rating || !Quality || !time){
    setFormError("please fill in the fields")
    return
   }
   const{data, error} = await supabase
   .from("Todo")
   .update({Title, Method, Rating, Quality, time})
   .eq("id", id)
   .select()
if (error){
    setFormError("please fill in the fields")
}
if(data){
    setFormError(null)
    console.log(data)
    navigate("/home")
}

}
      
    useEffect(() =>{
        const fetchupdate = async () =>{
            const{data, error} = await supabase
            .from("Todo")
            .select()
            .eq("id", id)
            .single()

        if(error){
            navigate("/home", {replace: true})

        }
        if(data){
            setTitle(data.Title)
            setMethod(data.Method)
            setRating(data.Rating)
            setQuality(data.Quality)
            setDate(data.time)
            console.log(data)


        }

        }

        fetchupdate()
    }, [id, navigate])

    return(
        <div className="page-update">
    
    <div className="heads">
        <h1> Update task</h1>
        <Link className="xx" to="/home" > <p className="xp"> ❌ </p></Link>    </div>


<div className="form2">
<form onSubmit={handlesubmit} className="forms">

<div className="middle" > <h1> Update Todo list</h1></div>

<label for="name">Title :</label> 
<input type="text" className="inputs"value={Title}  id="name" name="name" placeholder="e.g Johnn" onChange={(e)=> setTitle(e.target.value)}  required/> 


<label for="quantity">Priority :</label> 
<input type="text" className="inputs"value={Quality} id="quantity" name="quantity" required placeholder="High, low or Average" onChange={(e)=> setQuality(e.target.value)} /><br/>

<label for="rating">Rating :</label> 
<input type="number" className="inputs"value={Rating} id="price" name="price" onChange={(e)=> setRating(e.target.value)} placeholder="1-10" required/>

<label htmlFor="description">Description :</label> <br/>
<textarea name="description" id="description" className="inputs"value={Method} cols="30" rows="10" placeholder="etc lorem ipsum rshfklsd asdgf " onChange={(e)=> setMethod(e.target.value)} required></textarea>

<div className="butt">
<input className="date" type="time" value={time}  onChange={(e)=> setDate(e.target.value)} required  />


<button className="bts">Update todo list</button>

{formError && <p className="error">{formError}</p>}
</div>

</form>
</div>
        </div>
    )
}
export default Update