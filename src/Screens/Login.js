import React from "react";
import AuthProvider from "../context/AuthProvider"

const Login = () => {
  return (
    <div>
        <div>Login</div>
        <AuthProvider />
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