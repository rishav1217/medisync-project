import React, { useState, useEffect } from "react";

function AdminDashboard() {

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // 🔹 Fetch doctors
  const fetchDoctors = async () => {
    const res = await fetch(
      "http://localhost/medisync-php/admin/get_doctors.php",
      { credentials: "include" }
    );

    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // 🔹 Delete doctor
  const deleteDoctor = async (id) => {

    const formData = new FormData();
    formData.append("id", id);

    await fetch(
      "http://localhost/medisync-php/admin/delete_doctor.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    fetchDoctors();
  };

  // 🔹 Add doctor
  const handleAddDoctor = async () => {

    setMessage("");
    setCredentials(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("specialization", specialization);

    try {

      const res = await fetch(
        "http://localhost/medisync-php/admin/add_doctor.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {

        setMessage("Doctor added successfully");

        setCredentials({
          username: data.username,
          password: data.password,
        });

        setName("");
        setEmail("");
        setSpecialization("");

        fetchDoctors();

      } else {

        setMessage(data.error);

      }

    } catch {

      setMessage("Server error");

    }

  };

  // 🔹 Logout function
  const handleLogout = async () => {

    await fetch(
      "http://localhost/medisync-php/auth/logout.php",
      {
        method: "POST",
        credentials: "include"
      }
    );

    // redirect to login page
    window.location.href = "/";

  };

  return (

    <div className="d-flex">

      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >

        <h4>MediSync</h4>

        <hr />

        <button
          className="btn btn-light w-100 mb-2"
          onClick={() => setShowForm(true)}
        >
          Add Doctor
        </button>

        <button
          className="btn btn-light w-100 mb-2"
          onClick={() => setShowForm(false)}
        >
          Doctors List
        </button>

        <button
          className="btn btn-danger w-100"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* Main Content */}
      <div className="p-4 w-100">

        <h2>Admin Dashboard</h2>

        {showForm && (

          <div className="card p-3 mb-4">

            <h4>Add Doctor</h4>

            <input
              className="form-control mb-2"
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={handleAddDoctor}
            >
              Save Doctor
            </button>

            <p className="mt-2 text-success">{message}</p>

            {credentials && (

              <div className="alert alert-info mt-3">

                <b>Doctor Credentials</b>

                <br />

                Username: {credentials.username}

                <br />

                Password: {credentials.password}

              </div>

            )}

          </div>

        )}

        {/* Doctors Table */}

        <div className="card p-3">

          <h4>Doctors List</h4>

          <table className="table table-striped">

            <thead>

              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {doctors.map((doc) => (

                <tr key={doc.user_id}>

                  <td>{doc.user_id}</td>

                  <td>{doc.username}</td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteDoctor(doc.user_id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;
