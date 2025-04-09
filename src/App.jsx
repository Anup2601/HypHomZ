import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoleSelectionScreen from "./components/RoleSelectionScreen";
import SingInDesign from "./components/signin/SingInDesign";
import SignUpDesign from "./components/signup/SignUpDesign";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelectionScreen />} />
        <Route path="/signin" element={<SingInDesign/>} />
        <Route path="/signup" element={<SignUpDesign/>} />
        <Route path="/home" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
