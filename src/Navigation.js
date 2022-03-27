import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Components/Game";
import GamesList from "./Screens/GamesList";
import Login from "./Screens/Login";
import { AuthContext } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/games" />}></Route>
      <Route
        path="login"
        element={user ? <Navigate to="/games" /> : <Login />}
      ></Route>
      <Route
        path="games/:gameID"
        element={user ? <Game /> : <Navigate to="/login" />}
      />

      <Route
        path="games"
        element={user ? <GamesList /> : <Navigate to="/login" />}
      ></Route>
    </Routes>
  );
};

export default Navigation;
