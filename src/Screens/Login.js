import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import styled from "styled-components";
import colors from "../Constants/Colors";
import HeaderText from "../Components/HeaderText";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [username, setUsername] = useState("");

  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [x, setX] = useState(false);

  const { login, register, logout, user } = useContext(AuthContext);
  return (
    <Container>
      {x ? (
        <div>
          <HeaderText> Register User </HeaderText>

          <div style={{ marginTop: 10 }}></div>
          <Input
            placeholder="Email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <Input
            placeholder="Password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <Btn
            onClick={() => register(registerEmail, registerPassword, username)}
          >
            Login
          </Btn>
        </div>
      ) : (
        <div>
          <HeaderText> Login </HeaderText>
          <div style={{ marginTop: 10 }}></div>
          <Input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <Input
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <Btn onClick={() => login(loginEmail, loginPassword)}>Login</Btn>
        </div>
      )}
      <Bottom onClick={() => setX(!x)}>
        {x
          ? "Already Have an account? Log in"
          : "Don't have an account? Sign Up"}
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  width: 325px;
  margin: 0px auto;
  background-color: ${colors.gray600};
  padding: 16px;
  border-radius: 5px;
`;

const Input = styled.input`
  border-radius: 3px;
  margin-bottom: 12px;
  height: 40px;
  border: none;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Btn = styled.div`
  width: 100%;
  background-color: ${colors.gray500};
  padding: 8px;
  border-radius: 4px;
  display: grid;
  place-content: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.p`
  font-size: 14px;
  text-decoration: underline;
  margin-top: 12px;
  cursor: pointer;
`;

export default Login;
