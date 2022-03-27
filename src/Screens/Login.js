import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [username, setUsername] = useState("");

  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { login, register, logout, user } = useContext(AuthContext);
  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <input
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <button
          onClick={() => register(registerEmail, registerPassword, username)}
        >
          Create User
        </button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={() => login(loginEmail, loginPassword)}>
          {" "}
          Login{" "}
        </button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
};

export default Login;

/*const loginUser = async () => {
  if (email && password) {
    const user = await auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.log(err));
    console.log(user);
  }
};
const {user} = useContext(AuthContext);*/
