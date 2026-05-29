import './Addnew.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import supabase from "../supabaseClient"
// import{ useNavigate } from "react-router-dom"
// import { useContext } from "react";
import {useNavigate} from "react-router-dom"




function Addnew(){

  const navigate = useNavigate()

const[Title, setTitle] = useState("")
const[Method, setMethod] = useState("")
const[Rating, setRating] = useState("")
const[Quality, setQuality] = useState("")
const[time, setDate] = useState("")
const [formError, setFormError] = useState("")
const[load, setLoad] = useState("ADD TASK")
const [alarmTriggered, setAlarmTriggered] = useState(false);





useEffect(() => {
  const interval = setInterval(() => {
    const currentTime = new Date();

    const formattedCurrentTime =
      currentTime.getHours().toString().padStart(2, "0") +
      ":" +
      currentTime.getMinutes().toString().padStart(2, "0");

    if (
      formattedCurrentTime === time &&
      time !== "" &&
      !alarmTriggered
    ) {
      setAlarmTriggered(true);

      // Browser notification
      if (Notification.permission === "granted") {
        new Notification("⏰ Task Reminder", {
          body: `${Title} time reached!`,
        });
      }

      // Alarm sound
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      );
      audio.play();

      alert(`⏰ ${Title} time reached!`);

    }
  }, 1000);

  return () => clearInterval(interval);
}, [time, Title, alarmTriggered]);

// Ask notification permission
useEffect(() => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);


function isloading(){
  const loo = "NEW TASK ADDED"
  setLoad(loo)
}

const handleSubmit = async (e) =>{
  e.preventDefault()


  if(!Title || !Method || !Rating || !Quality || !time){
    setFormError("please fill in the fields")
    return
  }


const{ data, error} = await supabase
  .from("Todo")
  .insert([{
    Title, 
    Method, 
    Rating, 
    Quality,
    time
  }])

  if(error){
    console.log(error)
    setFormError("please fill in the fields")
  }
  if(data){
    setFormError(null)
    console.log(data)
    navigate('/home')
  }


 
}

    return(
        <div className="all">
        <div className="heads">
          <h1> BOOK NEW TASK</h1>
          <div>
          <Link className="xx" to="/home" > <p className="xp"> ❌ </p></Link>
          </div>
     </div>  
     <div className="submit">

    <form onSubmit={handleSubmit} className="forms">

        <div className="middle" > <h1>Todo list</h1></div>
        {formError && <p className="error">{formError}</p>}
       
       <label htmlFor="name">Title :</label> 
      <input type="text" className="inputs" id="name" name="name" placeholder="e.g Johnn" onChange={(e)=> setTitle(e.target.value)}  required/> 
     

      <label for="quantity">Priority :</label> 
      <input type="text" className="inputs" id="quantity" name="quantity" required placeholder="High, low or Average" onChange={(e)=> setQuality(e.target.value)} /><br/>

      <label for="rating">Date :</label> 
      <input type="date" className="inputs" id="price" name="price" onChange={(e)=> setRating(e.target.value)} placeholder="1-10" required/>

    <label htmlFor="description">Description :</label> <br/>
    <textarea name="description" id="description" className="inputs" cols="30" rows="10" placeholder="etc lorem ipsum rshfklsd asdgf " onChange={(e)=> setMethod(e.target.value)} required></textarea>

      <div className="butt">
      <input className="date" type="time"  onChange={(e)=> {setDate(e.target.value); setAlarmTriggered(false);}} required />
    <button onClick={isloading} className="bts">{load}</button>
      </div>

     </form>
     </div>



        </div>

        
 
    )
}
export default Addnew;