import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./login.css";

function Register(){

const navigate = useNavigate();

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [message,setMessage] = useState("");

const handleRegister = async (e)=>{

e.preventDefault();

const formData = new FormData();

formData.append("username",username);
formData.append("password",password);

const res = await fetch(
"http://localhost/medisync-php/auth/register.php",
{
method:"POST",
body:formData
}
);

const data = await res.json();

if(data.success){

setMessage("Registration successful");

setTimeout(()=>{
navigate("/");
},1500);

}else{

setMessage(data.error);

}

};

return(

<div className="login-container">

<div className="login-card">

<h1 className="logo">MediSync</h1>
<p className="subtitle">Patient Registration</p>

{message && <p className="error">{message}</p>}

<form onSubmit={handleRegister}>

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
Register
</button>

<p className="register-text">
Already have account? <a href="/">Login here</a>
</p>

</form>

</div>

</div>

);

}

export default Register;
