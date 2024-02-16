import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/homepage";
import LogIn from "./Pages/loginPage/Login";
import SignUp from "./Pages/loginPage/SignUp";
import { useSelector } from "react-redux"
import { useState } from "react";
import UserPostSingle from "./Pages/UserPost";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" /> } />
        <Route path="/profile/:id" element={<UserPostSingle />} />
      </Routes>
    </Router>
  );
}

export default App;
