import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./Components/Header";

function App() {
  return (
    <SCContainer>
      <Header />
      Hello
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 900px;
  margin: 0px auto;
`;

export default App;
