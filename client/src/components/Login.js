import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChanges = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    console.log(user);
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="welcome">Welcome to the Bubble App!</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChanges}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChanges}
        ></input>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
