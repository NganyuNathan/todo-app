import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cards from '../cards/Cards';
// import { useState } from 'react';
import supabase from "../supabaseClient";
import './header.css';
// import { useContext } from "react";


function Header({token}){
    console.log(supabase)

    let navigate = useNavigate()

    const now = new Date().toLocaleTimeString();
  const[time, setTime] = useState(now)

    setInterval(updatetime, 1000);

  function updatetime(){
      const newtime = new Date().toLocaleTimeString();
      setTime(newtime)
  } 

  const[error, setError]= useState(null)
  const[todo, setTodo] = useState(null)
  const[orderby, setOrderby] = useState("created_at")
  const [loading, setLoading] = useState(true);

  // const [notification, setNotification] = useState("")



  const handledelete = (id) => {
    setTodo(prevtodo => {
      return prevtodo.filter(sm => sm.id !==id)
    })
  } 


  useEffect(()=>{
       const fetchTodo = async()=>{
           const{data, error} = await supabase
           .from('Todo')
           .select()
           .order(orderby, {ascending: false})

           if(error) {
               setError("Could not fetch Task")
               setTodo(null)
               console.log(error)
           }
           if (data){
               setTodo(data)
               setError(null)
           }
           setLoading(false);
       }
       fetchTodo()

  },[orderby])




  function handlelogout(){
    sessionStorage.removeItem("token")
    alert("are you sure you want to logout?")
    navigate("/")


  }


    return(
        <div>
         <div className="head">

            
    <h1> Hi! {token.session?.user?.user_metadata?.firstname}🙌</h1>
            <div className="side">
          
            <div>
            <h2 className="links">{time}</h2>
            </div>
            <div className="linke">
            <button onClick={handlelogout}>Logout</button>
            </div>
            
            
            </div>

      
        </div>
   
      <div className="all">
      <div className="order-by">
                <p>Order-by:</p>
                <button onClick={() => setOrderby("Title")}>Title</button>
                <button onClick={() => setOrderby("Rating")}>Date</button>
                <button onClick={() => setOrderby("created_at")}>Time created</button> 
            
              </div>


                   
        {error &&(<p className="err">{error}</p>)}


        <div className="todo">     

  {loading ? (

    <div className="loadingc">
      {/* <img src="task.png" alt="loading..." /> */}
      <h1>Loading Task...</h1>
    </div>

  ) : (

    <div className="todoliss">

      {todo &&
        todo.map((Todo) => (
          <Cards
            key={Todo.id}
            todo={Todo}
            ondelete={handledelete}
          />
        ))}

    </div>

  )}

</div>
{/* 
        {loading ? (
  <div className="loadingc">
    <img src="task.png" alt="loading...."/>
  </div>
) : (     
        {todo &&(
            <div className="todoo">

  <div className="todoliss">
    {todo.map((Todo) => (
      <Cards
        key={Todo.id}
        todo={Todo}
        ondelete={handledelete}
      />
    ))}
  </div>
)} */}

             {/* {loading ?(
               <div className="loadingcont">
               <p>🔎Add Task🔍</p>
               </div>
             )}
               
                <div className="todoliss" placeholder="🔍ADD TASK🔎">
                {todo.map(Todo =>( 
                  <Cards key={Todo.id} todo={Todo} ondelete={handledelete} />
          ))}
            </div> */}
            
        </div>
      
       

        <div className="Addnew">
            <Link className="xx"  to="/addnew" > <p className="link"> ➕ </p></Link>
        
            

    </div>   
        
     </div>

// </div>
        
         
    )


}

export default Header;