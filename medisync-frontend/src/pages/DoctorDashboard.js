import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DoctorDashboard(){

const navigate = useNavigate();

const [doctor,setDoctor] = useState({});
const [appointments,setAppointments] = useState([]);

const [selectedAppointment,setSelectedAppointment] = useState(null);

const [diagnosis,setDiagnosis] = useState("");
const [prescription,setPrescription] = useState("");
const [notes,setNotes] = useState("");

/* LOAD DOCTOR PROFILE */

const fetchDoctor = async()=>{

const res = await fetch(
"http://localhost/medisync-php/doctor/profile.php",
{credentials:"include"}
);

const data = await res.json();

if(data.success){
setDoctor(data.doctor);
}

};

/* LOAD APPOINTMENTS */

const fetchAppointments = async()=>{

const res = await fetch(
"http://localhost/medisync-php/doctor/get_appointments.php",
{credentials:"include"}
);

const data = await res.json();

if(data.success){
setAppointments(data.appointments);
}

};

/* UPDATE STATUS */

const updateStatus = async(id,status)=>{

const formData = new FormData();

formData.append("appointment_id",id);
formData.append("status",status);

await fetch(
"http://localhost/medisync-php/doctor/update_status.php",
{
method:"POST",
body:formData,
credentials:"include"
}
);

fetchAppointments();

};

/* SAVE EHR */

const saveEhr = async()=>{

if(!selectedAppointment) return;

const formData = new FormData();

formData.append("appointment_id",selectedAppointment.appointment_id);
formData.append("patient_id",selectedAppointment.patient_id);
formData.append("diagnosis",diagnosis);
formData.append("prescription",prescription);
formData.append("notes",notes);

const res = await fetch(
"http://localhost/medisync-php/doctor/add_ehr.php",
{
method:"POST",
body:formData,
credentials:"include"
}
);

const data = await res.json();

if(data.success){

alert("EHR saved successfully");

setSelectedAppointment(null);
setDiagnosis("");
setPrescription("");
setNotes("");

}else{

alert(data.error);

}

};

/* LOGOUT */

const logout = async()=>{

await fetch(
"http://localhost/medisync-php/auth/logout.php",
{credentials:"include"}
);

navigate("/");

};

useEffect(()=>{
fetchDoctor();
fetchAppointments();
},[]);

return(

<div className="d-flex">

<Sidebar logout={logout}/>

<div className="w-100">

<Navbar title="Doctor Dashboard"/>

<div className="p-4">

{/* PROFILE */}

<div className="card p-3 mb-4">

<h4>Doctor Profile</h4>

<p><b>ID:</b> {doctor.user_id}</p>
<p><b>Username:</b> {doctor.username}</p>

</div>

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

{/* APPOINTMENTS TABLE */}

<div className="card p-3 mb-4">

<h4>Appointments</h4>

<table className="table table-striped">

<thead>

<tr>
<th>ID</th>
<th>Patient</th>
<th>Email</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{appointments.map((a)=>(

<tr key={a.appointment_id}>

<td>{a.appointment_id}</td>
<td>{a.patient_name}</td>
<td>{a.patient_email}</td>
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

</td>

<td>

<button
className="btn btn-success btn-sm me-2"
onClick={()=>updateStatus(a.appointment_id,"Approved")}
>
Approve
</button>

<button
className="btn btn-danger btn-sm me-2"
onClick={()=>updateStatus(a.appointment_id,"Rejected")}
>
Reject
</button>

<button
className="btn btn-primary btn-sm"
onClick={()=>setSelectedAppointment(a)}
>
Add EHR
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* EHR FORM (OUTSIDE TABLE) */}

{selectedAppointment && (

<div className="card p-4">

<h4>Add Medical Record</h4>

<p><b>Patient:</b> {selectedAppointment.patient_name}</p>

<textarea
className="form-control mb-2"
placeholder="Diagnosis"
value={diagnosis}
onChange={(e)=>setDiagnosis(e.target.value)}
/>

<textarea
className="form-control mb-2"
placeholder="Prescription"
value={prescription}
onChange={(e)=>setPrescription(e.target.value)}
/>

<textarea
className="form-control mb-3"
placeholder="Notes"
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

<button
className="btn btn-primary"
onClick={saveEhr}
>
Save Record
</button>

</div>

)}

</div>

</div>

</div>

);

}

export default DoctorDashboard;
