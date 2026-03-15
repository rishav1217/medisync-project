import React from "react";

function Sidebar({logout}){

return(

<div
className="bg-dark text-white p-3"
style={{width:"240px",minHeight:"100vh"}}
>

<h3 className="mb-4">MediSync</h3>

<button className="btn btn-light w-100 mb-2">
<i className="bi bi-calendar-check"></i> Appointments
</button>

<button
className="btn btn-danger w-100"
onClick={logout}
>
<i className="bi bi-box-arrow-right"></i> Logout
</button>

</div>

);

}

export default Sidebar;
