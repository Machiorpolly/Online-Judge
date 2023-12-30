import React from "react";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Problems from "./Components/Problems";
import Stats from "./Components/Stats";
import EasyProblems from "./Components/EasyProblems";
import MediumProblems from "./Components/MediumProblems";
import HardProblems from "./Components/HardProblems";
import Contest from "./Components/Contest";
import Learn from "./Components/Learn";
import About from "./Components/About";
import Signup from "./Components/Signup";
import ProblemPage from "./Components/ProblemPage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/problems/all" element={<Problems />}></Route>
        <Route path="Stats" element={<Stats />}></Route>
        <Route path="EasyProblems" element={<EasyProblems />}></Route>
        <Route path="MediumProblems" element={<MediumProblems />}></Route>
        <Route path="HardProblems" element={<HardProblems />}></Route>
        <Route path="Contest" element={<Contest />}></Route>
        <Route path="Learn" element={<Learn />}></Route>
        <Route path="About" element={<About />}></Route>
        <Route path="Signup" element={<Signup />}></Route>
        <Route path="problem/:pid" element={<ProblemPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
