import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");

const navigate = useNavigate();

const handleSubmit = async (e) => {

e.preventDefault();
setError("");

try{

const formData = new FormData();

formData.append("username",username);
formData.append("password",password);

const response = await fetch(
"http://localhost/medisync-php/auth/login.php",
{
method:"POST",
body:formData,
credentials:"include"
}
);

const data = await response.json();

if(data.success){

if(data.role==="ADMIN") navigate("/admin");

else if(data.role==="DOCTOR") navigate("/doctor");

else navigate("/patient");

}

else{

setError(data.error);

}

}

catch{

setError("Service not reachable");

}

};

return(

<div className="login-container">

<div className="login-card">

<h1 className="logo">MediSync</h1>
<p className="subtitle">Smart Healthcare System</p>

{error && <p className="error">{error}</p>}

<form onSubmit={handleSubmit}>

<input
className="input-field"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
className="input-field"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="login-btn" type="submit">
Login
</button>

<p className="register-text">
New patient? <a href="/register">Register here</a>
</p>

</form>

</div>

</div>

);

}

export default Login;
