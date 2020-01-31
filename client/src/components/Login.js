import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <form className="login-form">
        <h1 className="welcome">Welcome to the Bubble App!</h1>
        <label>Username</label>
        <input type="text" name="username" placeholder="username"></input>
        <label>Password</label>
        <input type="password" name="username" placeholder="password"></input>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
