import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user: userLogger } = useAuthContext();
  useEffect(() => {
    if (userLogger) {
      navigate("/");
    }
  }, [userLogger]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await AuthService.register(user.username, user.password);
      if (response.status === 200) {
        Swal.fire({
          title: "Registration Successful",
          text: response.data.message,
          icon: "success",
        });
        setUser({ username: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-center text-3xl font-bold text-primary mb-6">Sign Up</h2>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={user.username}
          className="input input-bordered rounded-lg"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={user.password}
          className="input input-bordered rounded-lg"
          onChange={handleChange}
          required
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-primary w-full mt-4 rounded-lg shadow-md"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Register;
