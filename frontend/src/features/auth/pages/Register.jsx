import { useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="button primary-button" type="submit">
            Submit
          </button>
        </form>

        <p className="auth-link-row">
          Already have an account?{" "}
          <Link className="auth-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
