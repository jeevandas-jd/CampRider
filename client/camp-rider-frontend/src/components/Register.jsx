import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "consumer",
    name: "",
    studentID: "",
    department: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Student ID"
          name="studentID"
          value={formData.studentID}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        <select name="role" onChange={handleChange} value={formData.role}>
          <option value="consumer">Consumer</option>
          <option value="pilot">Pilot</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
