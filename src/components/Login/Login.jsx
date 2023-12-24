import React, { useState } from "react";
import { MdLogin } from "react-icons/md"
function Login() {
  const [email, setEmail] = useStatge("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e)=>{
    e.preventDefault()
    console.log(email,password)
  }
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
