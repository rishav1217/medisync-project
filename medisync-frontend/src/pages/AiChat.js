import { useState } from "react";

function AiChat(){

const [input,setInput] = useState("");
const [messages,setMessages] = useState([]);

const sendMessage = async()=>{

if(!input) return;

const newMessages = [
...messages,
{sender:"user", text:input}
];

setMessages(newMessages);

const res = await fetch(
"http://localhost/medisync-php/ai/chatbot.php",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:input})
}
);

const data = await res.json();

setMessages([
...newMessages,
{sender:"ai", text:data.reply}
]);

setInput("");

};

return(

<div style={{
display:"flex",
flexDirection:"column",
height:"100vh",
background:"#f5f7fb"
}}>

<h2 style={{textAlign:"center"}}>AI Medical Assistant</h2>

<div style={{
flex:1,
overflowY:"auto",
padding:"20px"
}}>

{messages.map((msg,i)=>(

<div key={i}
style={{
marginBottom:"15px",
textAlign: msg.sender==="user" ? "right":"left"
}}
>

<span
style={{
display:"inline-block",
padding:"10px 15px",
borderRadius:"10px",
background:
msg.sender==="user"
?"#007bff"
:"#e5e5ea",
color:
msg.sender==="user"
?"white"
:"black"
}}
>

{msg.text}

</span>

</div>

))}

</div>

<div style={{
display:"flex",
padding:"10px",
background:"white"
}}>

<input
style={{
flex:1,
padding:"10px",
borderRadius:"6px",
border:"1px solid #ccc"
}}
placeholder="Describe your symptoms..."
value={input}
onChange={(e)=>setInput(e.target.value)}
/>

<button
style={{
marginLeft:"10px",
padding:"10px 20px",
background:"#007bff",
color:"white",
border:"none",
borderRadius:"6px"
}}
onClick={sendMessage}
>

Send

</button>

</div>

</div>

);

}

export default AiChat;