import React, { useEffect, useState } from "react";
import { MdLogin } from "react-icons/md"
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const handleLoginSubmit = (e)=>{
    e.preventDefault()
    if(email == " "|| password == "") toast.error("please fill in all fields")
    login(email,password)
  }
  useEffect(()=>{
    if(isAuthenticated){
        navigate("/",{replace:true})
    }
  },[isAuthenticated,navigate])
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form action="" className="form" onSubmit={(e)=>handleLoginSubmit(e)}>
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary"><span style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Login <MdLogin style={{marginLeft:"10px"}}/></span></button>
        </div>
      </form>
    </div>
  );
}

export default Login;
