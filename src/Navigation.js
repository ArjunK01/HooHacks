import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Components/Game";
import Login from "./Screens/Login";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<p>home</p>}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="games/:gameID" element={<Game />} />

      <Route path="games" element={<p>GamesList</p>}></Route>
    </Routes>
  );
};

export default Navigation;
