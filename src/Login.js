
import React, { useState } from "react";
import "./App.css";

function Login({ setIsLoggedIn }) {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    if (user.username === "admin" && user.password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Student System Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        {error && <p className="error-text">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p className="login-hint">
          Use: <b>admin / 1234</b>
        </p>
      </div>
    </div>
  );
}

export default Login;