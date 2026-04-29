import { Link } from "react-router";
import "../auth.form.scss";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log("TEST CHANGE");

  return (
    <main>
      <div className="form-container">
        <h1>Logincccc</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <button className="button primary-button" type="button">
            Submit
          </button>
        </form>

        <p className="auth-link-row">
          Don't have an account?{" "}
          <Link className="auth-link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
