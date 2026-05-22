import './Card.css';
import { Link } from 'react-router-dom';
import supabase from "../supabaseClient"
import { useState, useEffect } from 'react';


function Cards ({todo, ondelete}){
    const [alarmTriggered, setAlarmTriggered] = useState(false);


const handledelete = async () =>{
    const{data, error} = await supabase
    .from("Todo")
    .delete()
    .eq("id", todo.id)
    .select()

  if(error){
      console.log(error)
  }  
  if(data){
      console.log(data)
      ondelete(todo.id)
  }

}


return(
<div className="cards">
    <h2 className="titl">{todo.Title}</h2>
    <div className="hh3">
      <h4>{todo.Method}</h4>
    </div>
   <div className="delete">
   <p className="todo-date">{todo.time}</p>
    <div className="edits">
        <p className="up" onClick={handledelete} to={"/"}>🗑️</p>
        <Link className="ups" to={"/" + todo.id}>🖊️</Link>
    </div>

   </div>
    
    <p className="rating" > {todo.Rating} </p>
    <p className="qual">{todo.Quality}</p>
   



</div>

)
}
export default Cards;