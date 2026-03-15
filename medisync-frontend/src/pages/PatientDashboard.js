import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function PatientDashboard(){
const navigate = useNavigate();
const [doctors,setDoctors] = useState([]);
const [appointments,setAppointments] = useState([]);
const [ehr,setEhr] = useState([]);


const [doctorId,setDoctorId] = useState("");
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [date,setDate] = useState("");
const [time,setTime] = useState("");

const [message,setMessage] = useState("");

/* ================= LOAD DATA ================= */

useEffect(()=>{

fetch("http://localhost/medisync-php/patient/get_doctors.php")
.then(res=>res.json())
.then(data=>{
if(data.success){
setDoctors(data.doctors);
}
});

fetch(
"http://localhost/medisync-php/patient/get_my_appointments.php",
{
credentials:"include"
})
.then(res=>res.json())
.then(data=>{
if(data.success){
setAppointments(data.appointments);
}
});
fetch(
"http://localhost/medisync-php/patient/get_ehr.php",
{
credentials:"include"
})
.then(res=>res.json())
.then(data=>{
if(data.success){
setEhr(data.records);
}
});

},[]);


/* ================= BOOK APPOINTMENT ================= */

const handleBook = async()=>{

const formData = new FormData();

formData.append("doctor_id",doctorId);
formData.append("patient_name",name);
formData.append("patient_email",email);
formData.append("appointment_date",date);
formData.append("appointment_time",time);

const res = await fetch(
"http://localhost/medisync-php/patient/book_appointment.php",
{
method:"POST",
body:formData,
credentials:"include"
}
);

const data = await res.json();

if(data.success){

setMessage("Appointment booked successfully");

}else{

setMessage(data.error);

}

};


/* ================= LOGOUT ================= */

const handleLogout = async()=>{

await fetch(
"http://localhost/medisync-php/auth/logout.php",
{
method:"POST",
credentials:"include"
}
);

window.location.href="/";

};


/* ================= UI ================= */

return(

<div className="d-flex">

<Sidebar logout={handleLogout}/>

<div className="w-100">

<Navbar title="Patient Dashboard"/>

<div className="p-4">

{/* DASHBOARD CARDS */}

<div className="row mb-4">

<div className="col-md-4">

<div className="card text-center p-3">

<h5>Total Appointments</h5>
<h2>{appointments.length}</h2>

</div>

</div>

<div className="col-md-4">

<div className="card text-center p-3">

<h5>Pending</h5>
<h2>
{
appointments.filter(a=>a.status==="Pending").length
}
</h2>

</div>

</div>

<div className="col-md-4">

<div className="card text-center p-3">

<h5>Approved</h5>
<h2>
{
appointments.filter(a=>a.status==="Approved").length
}
</h2>

</div>

</div>

</div>

{/* BOOK APPOINTMENT */}

<div className="card p-4 mb-4">

<h4 className="mb-3">Book Appointment</h4>

<select
className="form-control mb-2"
value={doctorId}
onChange={(e)=>setDoctorId(e.target.value)}
>

<option value="">Select Doctor</option>

{doctors.map((doc)=>(
<option key={doc.user_id} value={doc.user_id}>
{doc.username}
</option>
))}

</select>


<input
className="form-control mb-2"
placeholder="Your Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<input
className="form-control mb-2"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="date"
className="form-control mb-2"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>


<input
type="time"
className="form-control mb-2"
value={time}
onChange={(e)=>setTime(e.target.value)}
/>


<button
className="btn btn-primary"
onClick={handleBook}
>
Book Appointment
</button>

<p className="text-success mt-2">{message}</p>

</div>

<button
className="btn btn-info"
onClick={()=>navigate("/ai")}
>
AI Medical Assistant
</button>

{/* MY APPOINTMENTS */}

<div className="card p-4">

<h4 className="mb-3">My Appointments</h4>

<table className="table table-striped">

<thead>

<tr>
<th>ID</th>
<th>Doctor</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{appointments.map((a)=>(

<tr key={a.appointment_id}>

<td>{a.appointment_id}</td>
<td>{a.doctor_id}</td>
<td>{a.appointment_date}</td>
<td>{a.appointment_time}</td>

<td>

<span className={
a.status==="Approved"
?"badge bg-success"
:a.status==="Rejected"
?"badge bg-danger"
:"badge bg-warning"
}>
{a.status}
</span>
<hr/>

<h2>Medical Records</h2>

<table className="table table-striped">

<thead>

<tr>
<th>Doctor</th>
<th>Diagnosis</th>
<th>Prescription</th>
<th>Notes</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{ehr.map((r)=>(

<tr key={r.record_id}>

<td>{r.doctor_name}</td>
<td>{r.diagnosis}</td>
<td>{r.prescription}</td>
<td>{r.notes}</td>
<td>{r.created_at}</td>

</tr>

))}

</tbody>

</table>


</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

</div>

);

}

export default PatientDashboard;
