import './App.css';
import Header from './Header/Header.jsx'; 
// import Body from './body/Body';
import Addnew from './addnew/Addnew.jsx';
import {BrowserRouter, Routes, Route}  from "react-router-dom";
import Update from './update/Update';
import Signin from './signin/Signin';
import Login from './signin/Login';
import { useState, useEffect } from 'react';


function App() {

const[token, setToken] = useState(null)

if(token){
  sessionStorage.setItem("token", JSON.stringify(token))

}
useEffect(() => {
  if(sessionStorage.getItem("token")){
    let data = JSON.parse(sessionStorage.getItem("token"))
    setToken(data)

  }
},[])

  return (


    <div className="App">
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route path="/signup" element={<Signin/>} />
      <Route path="/login" element={<Login setToken={setToken}/>} />
      {token?<Route path="/home" element={<Header token={token}/>} />:""}
      <Route path="/addnew" element={<Addnew/>} />
      <Route path="/new" element={<Header/>} />
      <Route path="/:id" element={<Update/>} />
    </Routes>
    </BrowserRouter>     
 {/* <Signin /> */}
    </div>
   
  );
}

export default App;
