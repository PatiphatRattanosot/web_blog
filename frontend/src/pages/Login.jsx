import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, user: userLogger } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await AuthService.login(user.username, user.password);
      if (response.status === 200) {
        Swal.fire({
          title: "Login Successful",
          text: response.data.message,
          icon: "success",
        });
        login(userLogger);
        setUser({ username: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold mb-6">Login</h2>

        <label>
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

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-4 rounded-lg shadow-md"
          >
            Login
          </button>
        </label>

        <p className="mt-4 text-center">
          Don't have an account?
          <a href="/sign-up" className="font-bold text-primary">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
